
import { AgentTask } from '../../AgenticService';

export interface TalentMatchingTaskParams {
  jobDescription: string;
  jobTitle?: string;
  requiredSkills?: string[];
  preferredSkills?: string[];
  experienceLevel?: number;
  location?: string;
  remoteOption?: boolean;
  matchingAlgorithm?: string;
  prioritizeCulturalFit?: boolean;
  includeNearMatches?: boolean;
  maxCandidates?: number;
}

export interface CandidateWithMatchDetails extends Record<string, any> {
  matchScore: number;
  skillMatch: number;
  experienceMatch: number;
  culturalFitScore: number;
  matchDetails: {
    matchedRequiredSkills: string[];
    matchedPreferredSkills: string[];
    missingSkills: string[];
  };
}

export interface MatchingInsights {
  topCandidatesAverageScore: number;
  mostCommonSkills: string[];
  candidatePoolQuality: string;
  mostMissingSkills: string[];
  recommendedInterviewQuestions: string[];
}
