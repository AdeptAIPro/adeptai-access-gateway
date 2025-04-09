
import { MatchingOptions, MatchingResult } from "@/components/talent-matching/types";
import { ProcessedJobDescription } from "./JobProcessingService";
import { generateCandidateProfiles } from "./CandidateGenerationService";
import { formatMatchingResults } from "./ResultsFormattingService";

/**
 * Main service for matching candidates with job descriptions
 */
export const generateCandidateResults = async (
  jobDetails: ProcessedJobDescription,
  matchingOptions: MatchingOptions
): Promise<MatchingResult> => {
  // Get target sources or use default
  const targetSources = matchingOptions.targetSources || ["Internal Database"];
  
  // Define how many candidates per source to generate
  const candidatesPerSource = 3;
  
  // Generate candidate profiles for each source
  const candidates = generateCandidateProfiles(
    candidatesPerSource,
    targetSources,
    jobDetails.suggestedExperience,
    jobDetails.extractedSkills
  );
  
  // Format the final results
  return formatMatchingResults(
    candidates,
    jobDetails,
    targetSources,
    matchingOptions.matchingModel
  );
};
