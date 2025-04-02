
import { CrossSourceCandidate, CrossSourceIntelligenceParams } from "../types/CrossSourceTypes";
import { TalentSearchParams } from '@/services/talent/types';
import { searchTalents } from "@/services/talent/TalentSearchService";

/**
 * Collect candidates from multiple sources in parallel
 */
export const collectCandidatesFromAllSources = async (params: CrossSourceIntelligenceParams): Promise<CrossSourceCandidate[]> => {
  const searchPromises = params.sources.map(source => {
    const searchParams: TalentSearchParams = {
      skills: params.requiredSkills,
      location: params.locations.join(','),
      experience: params.experienceLevel,
      source,
      limit: 20 // Get more candidates from each source for better matching
    };
    
    return searchTalents(searchParams);
  });
  
  try {
    const searchResults = await Promise.all(searchPromises);
    
    // Combine all candidates and remove duplicates 
    const allCandidates: CrossSourceCandidate[] = [];
    const seenIds = new Set();
    
    searchResults.forEach(result => {
      result.candidates.forEach(candidate => {
        if (!seenIds.has(candidate.id)) {
          seenIds.add(candidate.id);
          allCandidates.push({
            ...candidate,
            sourcesFound: [candidate.source]
          });
        } else {
          // If candidate exists in multiple sources, update the sourcesFound array
          const existingCandidate = allCandidates.find(c => c.id === candidate.id);
          if (existingCandidate && !existingCandidate.sourcesFound?.includes(candidate.source)) {
            existingCandidate.sourcesFound?.push(candidate.source);
            existingCandidate.crossSourceVerified = true;
          }
        }
      });
    });
    
    return allCandidates;
  } catch (error) {
    console.error("Error collecting candidates from sources:", error);
    return [];
  }
};

/**
 * Analyze consistency of candidate information across sources
 */
export const analyzeCrossSourceConsistency = (candidate: CrossSourceCandidate) => {
  // In production, this would compare actual data from different sources
  // For now, we'll simulate some consistency analysis
  return {
    score: candidate.sourcesFound?.length && candidate.sourcesFound.length > 2 ? 90 : 75,
    inconsistencies: []
  };
};

/**
 * Cross-reference candidates who appear in multiple sources to validate information
 */
export const crossReferenceMultipleSourceCandidates = async (candidates: CrossSourceCandidate[]): Promise<CrossSourceCandidate[]> => {
  return candidates.map(candidate => {
    // Calculate cross-source verification score (higher if found in multiple sources)
    const crossSourceScore = candidate.sourcesFound?.length && candidate.sourcesFound.length > 1 ? 
      Math.min(70 + (candidate.sourcesFound.length * 10), 100) : 
      50;
    
    return {
      ...candidate,
      crossSourceScore,
      verificationStatus: crossSourceScore > 70 ? 'verified' : 'unverified',
      informationConsistency: candidate.crossSourceVerified ? 
        analyzeCrossSourceConsistency(candidate) : 
        { score: 0, inconsistencies: [] }
    };
  });
};

/**
 * Calculate the average cross-source verification score
 */
export const calculateAverageCrossSourceScore = (candidates: CrossSourceCandidate[]): number => {
  if (candidates.length === 0) return 0;
  const sum = candidates.reduce((total, candidate) => 
    total + (candidate.crossSourceScore || 0), 0);
  return Math.round(sum / candidates.length);
};
