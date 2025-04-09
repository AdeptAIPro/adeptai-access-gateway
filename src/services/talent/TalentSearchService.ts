
import { TalentSearchParams, TalentSearchResponse, Talent } from './types';
import { searchTalentsFromSupabase } from './SupabaseTalentService';
import { searchTalentsFromExternalSource } from './ExternalTalentService';
import { getTalentSources } from './TalentSourcesService';
import { processCrossSourceTalentIntelligenceTask } from '../agentic-ai/talent/CrossSourceTalentIntelligenceService';
import { AgentTask } from '../agentic-ai/types/AgenticTypes';

// Combine results from multiple sources
export const searchTalents = async (
  params: TalentSearchParams
): Promise<TalentSearchResponse> => {
  try {
    // First, get results from Supabase
    const supabaseResults = await searchTalentsFromSupabase(params);
    
    // If specific external sources are requested, fetch from there too
    let externalResults: Talent[] = [];
    
    // Handle single source parameter
    if (params.source && params.source !== 'internal') {
      externalResults = await searchTalentsFromExternalSource(params.source, params);
    } 
    // Handle multiple sources parameter
    else if (params.sources && params.sources.length > 0) {
      // Filter out internal database which is handled by Supabase
      const externalSources = params.sources.filter(s => s !== 'internal' && s !== 'Internal Database');
      
      // Fetch from each external source
      for (const source of externalSources) {
        const sourceResults = await searchTalentsFromExternalSource(source, params);
        externalResults = [...externalResults, ...sourceResults];
      }
    }
    
    // Combine results
    if (externalResults.length > 0) {
      return {
        ...supabaseResults,
        candidates: [...supabaseResults.candidates, ...externalResults],
        total: supabaseResults.total + externalResults.length,
        totalPages: Math.ceil((supabaseResults.total + externalResults.length) / (params.limit || 10))
      };
    }
    
    return supabaseResults;
  } catch (error) {
    console.error('Error in searchTalents:', error);
    return {
      candidates: [],
      total: 0,
      page: params.page || 1,
      totalPages: 0
    };
  }
};

// Enhanced search using agentic cross-source intelligence
export const searchTalentsWithAgenticIntelligence = async (
  params: TalentSearchParams,
  jobDescription: string,
  requiredSkills: string[],
  preferredSkills: string[] = []
): Promise<any> => {
  try {
    // Create an agent task to perform cross-source intelligence
    const task: AgentTask = {
      id: `talent-intel-${Date.now()}`,
      taskType: 'cross-source-talent-intelligence',
      status: 'pending',
      goal: 'Find best matching candidates with cross-source validation',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: 'system',
      agentId: 'talent-intelligence-agent',
      priority: 'high',
      params: {
        jobDescription,
        requiredSkills,
        preferredSkills,
        experienceLevel: params.experience || 2,
        locations: params.location ? [params.location] : ['Remote'],
        // Use either sources array or fallback to getting all sources
        sources: params.sources && params.sources.length > 0 
          ? params.sources 
          : await getAllAvailableSources(),
        culturalFitPriority: 7, // High priority on cultural fit (0-10 scale)
        minMatchScore: 70
      }
    };
    
    // Process the task using our agentic service
    const completedTask = await processCrossSourceTalentIntelligenceTask(task);
    
    // If task was successful, return the result
    if (completedTask.status === 'completed' && completedTask.result) {
      return {
        candidates: completedTask.result.candidates,
        insights: completedTask.result.insights,
        outreachStrategies: completedTask.result.outreachStrategies,
        crossSourceValidation: completedTask.result.crossSourceValidation,
        total: completedTask.result.candidates.length,
        page: params.page || 1,
        totalPages: 1
      };
    } else {
      throw new Error(completedTask.error || 'Failed to complete talent intelligence task');
    }
  } catch (error) {
    console.error('Error in searchTalentsWithAgenticIntelligence:', error);
    // Fall back to standard search if the enhanced search fails
    return searchTalents(params);
  }
};

// Get all available talent sources
const getAllAvailableSources = async (): Promise<string[]> => {
  const sources = await getTalentSources();
  return sources
    .filter((source): source is string => {
      // Check if source is a non-null string
      return typeof source === 'string' && source !== null;
    })
    .map(source => {
      // Since we've properly filtered the sources with the type predicate above,
      // TypeScript knows that source is a string
      return source;
    });
};

// Re-export types and functions for simpler imports
export type { TalentSearchParams, TalentSearchResponse, Talent };
export { getTalentSources };
