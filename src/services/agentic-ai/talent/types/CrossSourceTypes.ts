
import { AgentTask } from "../../types/AgenticTypes";

export interface CrossSourceIntelligenceParams {
  jobDescription: string;
  requiredSkills: string[];
  preferredSkills: string[];
  experienceLevel: number;
  locations: string[];
  sources: string[];
  culturalFitPriority: number; // 0-10 scale
  minMatchScore: number;
}

export interface JobAnalysisResult {
  suggestedExperience: number;
  companyCulture: string;
  teamDynamics: string;
  projectComplexity: string;
  suggestedSkills: string[];
}

export interface SourceDistribution {
  [source: string]: number;
}

export interface CandidateConsistencyInfo {
  score: number;
  inconsistencies: string[];
}

export interface CrossSourceCandidate {
  id: string;
  name: string;
  skills?: string[];
  experience?: string;
  source?: string;
  sourcesFound?: string[];
  crossSourceVerified?: boolean;
  matchScore: number;
  crossSourceScore?: number;
  verificationStatus?: 'verified' | 'unverified';
  informationConsistency?: CandidateConsistencyInfo;
  [key: string]: any;
}

export interface OutreachStrategy {
  candidateId: string;
  candidateName: string;
  recommendedApproach: string;
  suggestedTalkingPoints: string[];
  estimatedResponseRate: string;
  bestContactMethod: string;
}

export interface CrossSourceStatistics {
  totalCandidates: number;
  verifiedCandidates: number;
  verifiedPercentage: number;
  averageCrossSourceScore: number;
}

export interface SourcingStrategy {
  mostEffectiveSources: string[];
  recommendedSources: string[];
  suggestedOutreachOrder: string[];
  untappedSources: string[];
}

export interface CompetitivePositioning {
  talentAvailability: string;
  competitiveness: string;
  salaryRange: {
    min: number;
    max: number;
    median: number;
  };
  timeToHire: string;
}

export interface CrossSourceInsights {
  crossSourceStatistics: CrossSourceStatistics;
  talentPoolQuality: string;
  recommendedSourcingStrategy: SourcingStrategy;
  competitivePositioning: CompetitivePositioning;
}

export interface CrossSourceValidation {
  candidatesFound: number;
  sourcesSearched: string[];
  averageCrossSourceScore: number;
}

export interface CrossSourceTaskResult {
  candidates: CrossSourceCandidate[];
  insights: CrossSourceInsights;
  outreachStrategies: OutreachStrategy[];
  crossSourceValidation: CrossSourceValidation;
}
