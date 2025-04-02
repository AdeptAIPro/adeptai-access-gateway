
export interface CrossSourceIntelligenceParams {
  jobDescription?: string;
  requiredSkills?: string[];
  preferredSkills?: string[];
  experienceLevel?: number;
  locations?: string[];
  sources?: string[];
  culturalFitPriority?: number; // 0-10 scale
  minMatchScore?: number;
}

export interface CrossSourceCandidate {
  id: string;
  name: string;
  title: string;
  location: string;
  skills: string[];
  experience: string | number;
  education: string;
  matchScore: number;
  source: string;
  crossSourceOccurrences?: number;
  crossSourceVerified?: boolean;
  crossSourceSources?: string[];
  crossSourceScore?: number;
  informationConsistency?: {
    score: number;
    inconsistencies: {
      field: string;
      values: string[];
    }[];
  };
  verificationStatus?: 'verified' | 'partial' | 'unverified';
  email?: string;
  phone?: string;
  availability?: string;
  rate?: string;
  bio?: string;
  culturalFitScore?: number;
}

export interface CrossSourceValidation {
  sourcesSearched: string[];
  candidatesFound: number;
  verifiedCandidates: number;
  verificationRate: number;
  averageCrossSourceScore: number;
}

export interface JobAnalysisResult {
  requiredSkills: string[];
  preferredSkills: string[];
  experienceLevel: number;
  locations: string[];
  jobTitle: string;
  jobDescription: string;
  keyResponsibilities: string[];
  suggestedExperience?: number; // Added to fix type error
}

export interface CrossSourceInsights {
  talentPoolQuality: string;
  crossSourceStatistics: {
    totalCandidates: number;
    verifiedCandidates: number;
    verifiedPercentage: number;
    averageCrossSourceScore: number;
  };
  recommendedSourcingStrategy?: SourcingStrategy;
  competitivePositioning?: CompetitivePositioning;
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

export interface OutreachStrategy {
  recommendedChannels: string[];
  suggestedTemplates: {
    type: string;
    subject?: string;
    body: string;
  }[];
  bestTimesToContact?: string[];
  followUpStrategy?: {
    timing: string;
    message: string;
  };
}
