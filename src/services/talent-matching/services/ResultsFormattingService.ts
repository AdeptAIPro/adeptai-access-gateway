
import { MatchingResult, Candidate } from "@/components/talent-matching/types";
import { generateDummyInsights } from "@/hooks/talent-matching/matching-utils";
import { ProcessedJobDescription } from "./JobProcessingService";

/**
 * Creates the final matching result object from candidates and job details
 */
export const formatMatchingResults = (
  candidates: Candidate[],
  jobDetails: ProcessedJobDescription,
  targetSources: string[],
  matchingModelUsed?: string
): MatchingResult => {
  // Sort candidates by match score
  const sortedCandidates = [...candidates].sort((a, b) => b.matchScore - a.matchScore);
  
  // Generate insights
  const insights = generateDummyInsights(targetSources);
  
  // Calculate candidates per source
  const candidatesPerSource = targetSources.reduce((acc, source) => {
    acc[source] = candidates.filter(c => c.source === source).length;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    candidates: sortedCandidates,
    jobTitle: jobDetails.extractedTitle || '',
    extractedSkills: jobDetails.extractedSkills || [],
    suggestedExperience: jobDetails.suggestedExperience,
    keyResponsibilities: jobDetails.keyResponsibilities,
    matchingModelUsed: matchingModelUsed || 'default',
    totalCandidatesScanned: 150 + (targetSources.length * 50) + Math.floor(Math.random() * 300),
    matchTime: 2.5 + Math.random() * 1.5,
    sourcesUsed: targetSources,
    candidatesPerSource,
    insights,
    crossSourceValidation: {
      sourcesSearched: targetSources,
      candidatesFound: sortedCandidates.length + 5,
      verifiedCandidates: Math.floor(sortedCandidates.length / 2),
      verificationRate: 0.42,
      averageCrossSourceScore: 0.78
    }
  };
};
