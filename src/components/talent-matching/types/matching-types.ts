
export interface MatchingOptions {
  matchingModel: string;
  weightSkills: number;
  weightExperience: number;
  weightEducation: number;
  threshold: number;
  includePartialMatches: boolean;
  minMatchScore: number;
  useComplianceVerification: boolean;
  prioritizeCulturalFit: boolean;
  useSemanticMatching: boolean;
  useRAG: boolean;
  useSkillBasedFiltering: boolean;
  targetSources?: string[];
  model?: string;
}

export interface MatchingModel {
  id: string;
  name: string;
  description: string;
  isDefault?: boolean;
  isCustom?: boolean;
  complexity?: string;
  complexityColor?: string;
  performance?: number;
  accuracyScore?: number;
  type?: string;
}

export interface MatchingResult {
  jobTitle: string;
  extractedSkills: string[];
  candidates: Candidate[];
  suggestedExperience: number;
  totalCandidatesScanned: number;
  matchTime?: number;
  matchingModelUsed?: string;
  keyResponsibilities?: string[];
  insights?: MatchingInsightsData;
  crossSourceValidation?: {
    sourcesSearched: string[];
    candidatesFound: number;
    verifiedCandidates: number;
    verificationRate: number;
    averageCrossSourceScore: number;
  };
  sourcesUsed?: string[];
  candidatesPerSource?: Record<string, number>;
}

export interface MatchingInsightsData {
  talentPoolQuality: string;
  competitivePositioning: {
    talentAvailability: string;
    competitiveness: string;
    salaryRange: {
      min: number;
      max: number;
      median: number;
    };
    timeToHire: string;
  };
  recommendedSourcingStrategy: {
    mostEffectiveSources: string[];
    suggestedOutreachOrder: string[];
    untappedSources: string[];
    recommendedSources?: string[];
  };
  crossSourceStatistics?: {
    sourcesAnalyzed: number;
    profilesMatched: number;
    averageMatchConfidence: number;
  };
}
