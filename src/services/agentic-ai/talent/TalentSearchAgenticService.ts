
import { AgentTask } from '../AgenticService';
import { searchTalents, TalentSearchParams } from '@/services/talent/TalentSearchService';
import { getTalentSources } from '@/services/talent/TalentSourcesService';

export interface TalentSearchTaskParams {
  skills?: string[];
  location?: string;
  experience?: number;
  source?: string;
  customCriteria?: Record<string, any>;
  maxResults?: number;
}

// Define an interface for sources that have an id
interface SourceWithId {
  id: string;
  [key: string]: any;
}

export async function processTalentSearchTask(task: AgentTask): Promise<any> {
  try {
    const params = task.params as TalentSearchTaskParams;
    
    // Convert agent params to search params
    const searchParams: TalentSearchParams = {
      skills: params.skills,
      location: params.location,
      experience: params.experience,
      source: params.source,
      limit: params.maxResults || 10,
      page: 1
    };
    
    // Get available sources to help with search
    const sources = await getTalentSources();
    
    // First search in internal database
    const initialResults = await searchTalents(searchParams);
    
    // If no specific source was specified, we can search across multiple sources
    if (!params.source && initialResults.candidates.length < searchParams.limit) {
      const remainingResults = searchParams.limit - initialResults.candidates.length;
      
      // Try each external source until we have enough results
      for (const source of sources) {
        // Skip if source is just a string
        if (typeof source === 'string') {
          continue;
        }
        
        // Check if source has an id property using type guard
        if (!('id' in source)) {
          continue;
        }
        
        const sourceWithId = source as SourceWithId;
        
        if (sourceWithId.id === 'internal') continue; // Skip internal, we already searched it
        
        const externalSearchParams = {
          ...searchParams,
          source: sourceWithId.id,
          limit: remainingResults
        };
        
        const externalResults = await searchTalents(externalSearchParams);
        
        // Add unique candidates from external sources
        const existingIds = new Set(initialResults.candidates.map(c => c.id));
        const uniqueExternalCandidates = externalResults.candidates.filter(c => !existingIds.has(c.id));
        
        initialResults.candidates = [
          ...initialResults.candidates,
          ...uniqueExternalCandidates.slice(0, remainingResults)
        ];
        
        initialResults.total += uniqueExternalCandidates.length;
        
        if (initialResults.candidates.length >= searchParams.limit) {
          break;
        }
      }
    }
    
    // Return the aggregated results with agent enhancement
    return {
      candidates: initialResults.candidates,
      total: initialResults.total,
      agentInsights: generateAgentInsights(initialResults.candidates, params),
      nextSteps: generateNextSteps(initialResults.candidates.length > 0)
    };
  } catch (error) {
    console.error('Error processing talent search task:', error);
    throw error;
  }
}

// Generate insights about the candidate pool
function generateAgentInsights(candidates: any[], params: TalentSearchTaskParams): any {
  // In a real implementation, this would use LLM to generate insights
  // For now, we'll provide dummy insights
  
  const skillBreakdown: Record<string, number> = {};
  const locationBreakdown: Record<string, number> = {};
  
  candidates.forEach(candidate => {
    // Count skills
    if (candidate.skills && Array.isArray(candidate.skills)) {
      candidate.skills.forEach((skill: string) => {
        skillBreakdown[skill] = (skillBreakdown[skill] || 0) + 1;
      });
    }
    
    // Count locations
    if (candidate.location) {
      locationBreakdown[candidate.location] = (locationBreakdown[candidate.location] || 0) + 1;
    }
  });
  
  return {
    totalCandidates: candidates.length,
    skillDistribution: Object.entries(skillBreakdown)
      .map(([skill, count]) => ({ skill, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5),
    locationDistribution: Object.entries(locationBreakdown)
      .map(([location, count]) => ({ location, count }))
      .sort((a, b) => b.count - a.count),
    averageExperience: candidates.reduce((sum, c) => sum + (c.experience || 0), 0) / candidates.length || 0,
    searchEffectiveness: candidates.length > 0 
      ? (candidates.length / (params.maxResults || 10)) * 100 
      : 0
  };
}

// Generate recommended next steps
function generateNextSteps(hasResults: boolean): string[] {
  if (!hasResults) {
    return [
      "Try broadening your search criteria",
      "Consider searching in additional talent sources",
      "Reduce experience requirements to find more junior candidates"
    ];
  }
  
  return [
    "Review candidate profiles and select top candidates",
    "Schedule initial screening calls with promising candidates",
    "Prepare personalized outreach messages for each candidate",
    "Setup skill assessment tests for technical roles"
  ];
}
