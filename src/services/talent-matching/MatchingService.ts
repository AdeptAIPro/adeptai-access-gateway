
import { MatchingModel, MatchingOptions } from "@/components/talent-matching/types";
import { processJobDescription } from "./services/JobProcessingService";
import { generateCandidateResults } from "./services/CandidateMatchingService";
import { getAvailableMatchingModelsFromDatabase, getDefaultMatchingModels } from "./models/MatchingModelsService";

export async function matchCandidatesWithJobDescription(
  jobDescription: string,
  matchingOptions: MatchingOptions
) {
  // Process the job description
  const jobDetails = await processJobDescription(jobDescription);
  
  // Generate matching results
  return generateCandidateResults(jobDetails, matchingOptions);
}

export async function getAvailableMatchingModels(): Promise<MatchingModel[]> {
  try {
    // First try to fetch from database
    const dbModels = await getAvailableMatchingModelsFromDatabase();
    
    if (dbModels && dbModels.length > 0) {
      return dbModels;
    }
    
    // If no models in database, return default models
    return getDefaultMatchingModels();
  } catch (error) {
    console.error("Error fetching matching models:", error);
    return [];
  }
}
