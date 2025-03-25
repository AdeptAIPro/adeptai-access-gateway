
import { Candidate, MatchingOptions, MatchingResult, MatchingModel } from "@/components/talent-matching/types";
import { matchCandidatesFromDatabase } from "./matchers/DatabaseMatcher";
import { getAvailableMatchingModelsFromDatabase } from "./models/MatchingModelsService";
import { getFallbackMatchingResult, getFallbackMatchingModels } from "./fallbacks/MatchingFallbacks";

/**
 * Production implementation of AI-driven talent matching service.
 * This uses Supabase as the data source and can be configured to use other databases.
 */
export const matchCandidatesWithJobDescription = async (
  jobDescription: string,
  options: MatchingOptions
): Promise<MatchingResult> => {
  console.log("Matching with options:", options);
  const startTime = performance.now();
  
  try {
    // Get candidates from database with applied filters
    const matchedCandidates = await matchCandidatesFromDatabase(jobDescription, options);
    
    // If no candidates found, use fallback
    if (!matchedCandidates || matchedCandidates.length === 0) {
      console.log("No candidates found, using fallback mock data");
      return getFallbackMatchingResult(options);
    }
    
    // Sort by match score descending
    matchedCandidates.sort((a, b) => b.matchScore - a.matchScore);
    
    const endTime = performance.now();
    const matchingTime = (endTime - startTime) / 1000; // Convert to seconds
    
    return {
      candidates: matchedCandidates,
      matchingModelUsed: options.matchingModel,
      matchingTime
    };
  } catch (error) {
    console.error("Error in matching service:", error);
    // Fallback to mock data if there's an error
    return getFallbackMatchingResult(options);
  }
};

export const getAvailableMatchingModels = async (): Promise<MatchingModel[]> => {
  try {
    const models = await getAvailableMatchingModelsFromDatabase();
    
    if (models && models.length > 0) {
      return models;
    }
    
    // Fallback to hardcoded models if none in database
    return getFallbackMatchingModels();
  } catch (error) {
    console.error("Error fetching matching models:", error);
    return getFallbackMatchingModels();
  }
};
