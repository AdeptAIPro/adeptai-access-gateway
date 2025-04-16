
import { 
  TalentSearchParams,
  TalentSearchResponse,
  Talent
} from './types';
import { processCrossSourceTalentIntelligenceTask } from '../agentic-ai/talent/CrossSourceTalentIntelligenceService';
import { supabase } from '@/lib/supabase';

/**
 * Service for searching talents using AI-powered cross-source intelligence
 */
export const searchTalentsWithAgenticIntelligence = async (
  params: TalentSearchParams,
  jobDescription?: string,
  requiredSkills?: string[],
  preferredSkills?: string[]
): Promise<TalentSearchResponse> => {
  console.log("Searching talents with agentic intelligence:", { params, jobDescription });
  
  try {
    // Create a task for the agentic AI system
    const task = {
      id: `task-${Date.now()}`,
      taskType: "talent-intelligence",
      status: "pending",
      goal: "Find candidates matching job requirements across multiple sources",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: "user-1", // In real app, this would be the actual user ID
      agentId: "agent-talent-intelligence",
      priority: "medium",
      params: {
        jobDescription,
        requiredSkills,
        preferredSkills,
        sources: params.sources || ['Internal Database', 'LinkedIn', 'GitHub'],
        minMatchScore: 70,
        culturalFitPriority: 5
      }
    };
    
    // Process the task
    const result = await processCrossSourceTalentIntelligenceTask(task);
    
    // Check if the task completed successfully
    if (result.status === "completed" && result.result) {
      // For internal database sources, augment with data from our database
      if (params.sources?.includes('Internal Database')) {
        await augmentWithInternalDatabase(result.result.candidates, params);
      }
      
      const response: TalentSearchResponse = {
        candidates: result.result.candidates,
        total: result.result.candidates.length,
        page: params.page || 1,
        totalPages: 1,
        timestamp: Date.now()
      };
      
      return response;
    } else {
      throw new Error(result.error || "Failed to process talent intelligence task");
    }
  } catch (error) {
    console.error("Error in searchTalentsWithAgenticIntelligence:", error);
    
    // Return empty results as fallback
    return {
      candidates: [],
      total: 0,
      page: params.page || 1,
      totalPages: 0,
      timestamp: Date.now()
    };
  }
};

/**
 * Augment the candidate results with data from our internal database
 */
const augmentWithInternalDatabase = async (
  candidates: Talent[],
  params: TalentSearchParams
): Promise<void> => {
  try {
    // Check if we have a valid Supabase connection
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey || 
        supabaseUrl === 'https://placeholder-supabase-url.supabase.co' || 
        supabaseAnonKey === 'placeholder-anon-key') {
      console.log('Using placeholder Supabase credentials - skipping database augmentation');
      return;
    }
    
    // Create query to get internal candidates
    let query = supabase.from('candidates').select('*');
    
    // Add filters based on the search params
    if (params.skills && params.skills.length > 0) {
      // Using contains operator for array of skills
      query = query.contains('skills', params.skills);
    }
    
    if (params.location) {
      query = query.ilike('location', `%${params.location}%`);
    }
    
    if (params.experience) {
      query = query.gte('experience', params.experience);
    }
    
    // Execute query
    const { data, error } = await query.limit(50);
    
    if (error) {
      console.error("Error fetching internal candidates:", error);
      return;
    }
    
    if (!data || data.length === 0) {
      console.log("No internal candidates found");
      return;
    }
    
    console.log(`Found ${data.length} internal candidates`);
    
    // Map internal candidates to our Talent model
    const internalCandidates: Talent[] = data.map(item => ({
      id: item.id,
      name: item.name,
      title: item.title || 'Unknown Position',
      location: item.location || 'Remote',
      skills: item.skills || [],
      experience: item.experience || 0,
      education: item.education || 'Not specified',
      source: 'Internal Database',
      matchScore: item.match_score || 80, // Default match score for internal candidates
      crossSourceVerified: true,
      crossSourceOccurrences: 1,
      crossSourceSources: ['Internal Database'],
      crossSourceScore: 1.0
    }));
    
    // Merge internal candidates with the existing results
    // Make sure to deduplicate in case we have the same candidates from different sources
    const existingIds = new Set(candidates.map(c => c.id));
    
    for (const candidate of internalCandidates) {
      if (!existingIds.has(candidate.id)) {
        candidates.push(candidate);
        existingIds.add(candidate.id);
      }
    }
  } catch (error) {
    console.error("Error augmenting with internal database:", error);
  }
};
