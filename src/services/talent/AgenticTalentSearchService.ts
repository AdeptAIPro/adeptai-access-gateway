
import { TalentSearchParams } from './types';
import { getCacheKey, getFromCache, addToCache } from './cache/TalentSearchCache';
import { searchTalents } from './BasicTalentSearchService';
import { getTalentSources } from './TalentSourcesService';
import { processCrossSourceTalentIntelligenceTask } from '../agentic-ai/talent/CrossSourceTalentIntelligenceService';
import { AgentTask } from '../agentic-ai/types/AgenticTypes';

// Enhanced search using agentic cross-source intelligence with caching
export const searchTalentsWithAgenticIntelligence = async (
  params: TalentSearchParams,
  jobDescription: string,
  requiredSkills: string[],
  preferredSkills: string[] = []
): Promise<any> => {
  try {
    // Generate a cache key for the agentic search
    const agenticCacheKey = `agentic-${getCacheKey(params)}-${jobDescription.slice(0, 50)}-${requiredSkills.join(',')}-${preferredSkills.join(',')}`;
    
    // Check cache first
    const cachedResult = getFromCache(agenticCacheKey);
    if (cachedResult) {
      return cachedResult;
    }
    
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
      const response = {
        candidates: completedTask.result.candidates,
        insights: completedTask.result.insights,
        outreachStrategies: completedTask.result.outreachStrategies,
        crossSourceValidation: completedTask.result.crossSourceValidation,
        total: completedTask.result.candidates.length,
        page: params.page || 1,
        totalPages: 1,
        timestamp: Date.now()
      };
      
      // Cache the results
      addToCache(agenticCacheKey, response);
      
      return response;
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
    .map(source => source);
};
