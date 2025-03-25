
import { MatchingOptions } from "@/components/talent-matching/types";
import { CandidateRecord } from "@/lib/supabase";

/**
 * Calculate match score based on job description and candidate data
 */
export const calculateMatchScore = (
  candidate: CandidateRecord, 
  jobDescription: string, 
  options: MatchingOptions
): number => {
  // If the candidate already has a match score, use it
  if (candidate.match_score) {
    return candidate.match_score;
  }
  
  // Simple fallback algorithm if we need to calculate a score ourselves
  // In a real system, this would be done by a more sophisticated ML algorithm
  let baseScore = 75 + Math.random() * 20; // Random base score between 75-95
  
  // Boost for semantic matching
  if (options.useSemanticMatching) {
    baseScore += 5;
  }
  
  // Boost for RAG
  if (options.useRAG) {
    baseScore += 3;
  }
  
  return Math.min(Math.round(baseScore), 100); // Cap at 100
};
