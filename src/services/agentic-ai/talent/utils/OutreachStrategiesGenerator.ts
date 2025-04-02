
import { CrossSourceCandidate, OutreachStrategy } from "../types/CrossSourceTypes";

/**
 * Generate customized outreach strategies for each candidate
 */
export const generateCustomOutreachStrategies = (candidates: CrossSourceCandidate[]): OutreachStrategy[] => {
  return candidates.slice(0, 5).map(candidate => ({
    candidateId: candidate.id,
    candidateName: candidate.name,
    recommendedApproach: candidate.matchScore > 90 ? 'High-Touch Personalized' : 'Standard Outreach',
    suggestedTalkingPoints: [
      `Experience with ${candidate.skills?.slice(0, 2).join(' and ')}`,
      `Similar industry background at ${candidate.experience?.split(' at ')[1] || 'their current company'}`,
      candidate.crossSourceVerified ? 'Validated expertise across multiple platforms' : 'Unique skill combination'
    ],
    estimatedResponseRate: candidate.matchScore > 85 ? 'High' : 'Medium',
    bestContactMethod: candidate.email ? 'Email' : 'LinkedIn'
  }));
};
