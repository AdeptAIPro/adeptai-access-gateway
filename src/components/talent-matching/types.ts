
export interface MatchingOptions {
  model: string;
  minMatchScore: number;
  useComplianceVerification: boolean;
  prioritizeCulturalFit: boolean;
  useSemanticMatching?: boolean;
  useRAG?: boolean;
  useSkillBasedFiltering?: boolean;
  matchingModel?: string;
}

export interface Candidate {
  id: string;
  name: string;
  title: string;
  location: string;
  education: string;
  experience: number;
  skills: string[];
  matchScore: number;
  source: string;
  avatar: string;
  culturalFitScore?: number;
  complianceVerified?: boolean;
  certifications?: string[];
  implicitCompetencies?: string[];
  embeddings?: number[];
  historicalSuccessRate?: number;
  crossSourceVerified?: boolean;
  crossSourceOccurrences?: number;
  crossSourceSources?: string[];
}

export interface MatchingInsights {
  talentPoolQuality: string;
  crossSourceStatistics?: {
    totalCandidates: number;
    verifiedCandidates: number;
    verifiedPercentage: number;
    averageCrossSourceScore: number;
  };
  recommendedSourcingStrategy?: {
    mostEffectiveSources: string[];
    recommendedSources: string[];
    suggestedOutreachOrder: string[];
    untappedSources: string[];
  };
  competitivePositioning?: {
    talentAvailability: string;
    competitiveness: string;
    salaryRange: {
      min: number;
      max: number;
      median: number;
    };
    timeToHire: string;
  };
}

export interface CrossSourceValidation {
  sourcesSearched: string[];
  candidatesFound: number;
  verifiedCandidates: number;
  verificationRate: number;
  averageCrossSourceScore: number;
}

export interface MatchingResult {
  candidates: Candidate[];
  jobTitle: string;
  extractedSkills: string[];
  suggestedExperience: number;
  keyResponsibilities?: string[];
  matchingModelUsed?: string;
  totalCandidatesScanned?: number;
  matchTime?: number;
  insights?: MatchingInsights;
  crossSourceValidation?: CrossSourceValidation;
}

export interface MatchingModel {
  id: string;
  name: string;
  description: string;
  complexity: 'basic' | 'intermediate' | 'advanced';
  performance: number;
  accuracyScore: number;
  icon?: any; // Changed from React.ReactNode to any to resolve type issues
  type?: string;
}
