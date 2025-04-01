
import { AgentTask } from '../AgenticService';
import { searchTalents } from '@/services/talent/TalentSearchService';
import { processJobDescription } from '@/services/talent-matching/MatchingService';
import { TalentMatchingTaskParams } from './types/TalentMatchingTypes';
import { rankCandidates } from './utils/CandidateRanking';
import { generateMatchingInsights } from './utils/InsightsGenerator';
import { generateNextSteps } from './utils/NextStepsGenerator';

export { TalentMatchingTaskParams };

export async function processTalentMatchingTask(task: AgentTask): Promise<any> {
  try {
    const params = task.params as TalentMatchingTaskParams;
    
    // First, process the job description to extract key details
    const jobAnalysis = await processJobDescription(params.jobDescription);
    
    // Combine explicit requirements with extracted ones
    const searchSkills = [...(jobAnalysis.extractedSkills || []), ...(params.requiredSkills || [])];
    
    // Search for candidates matching the core requirements
    const candidates = await searchTalents({
      skills: searchSkills.slice(0, 5), // Use top 5 skills for broader results
      experience: params.experienceLevel || jobAnalysis.suggestedExperience,
      location: params.location,
      limit: 50 // Get a large pool to score and rank
    });
    
    // Score and rank candidates
    const rankedCandidates = rankCandidates(
      candidates.candidates, 
      searchSkills,
      params.preferredSkills || [],
      params.prioritizeCulturalFit || false,
      jobAnalysis
    );
    
    // Return the top matches based on maxCandidates
    return {
      matches: rankedCandidates.slice(0, params.maxCandidates || 10),
      jobAnalysis: {
        extractedTitle: jobAnalysis.extractedTitle || params.jobTitle,
        coreSkills: jobAnalysis.extractedSkills?.slice(0, 5) || [],
        suggestedExperience: jobAnalysis.suggestedExperience,
        keyResponsibilities: jobAnalysis.keyResponsibilities || []
      },
      matchingInsights: generateMatchingInsights(rankedCandidates, params),
      nextSteps: generateNextSteps(rankedCandidates.length > 0, params)
    };
  } catch (error) {
    console.error('Error processing talent matching task:', error);
    throw error;
  }
}
