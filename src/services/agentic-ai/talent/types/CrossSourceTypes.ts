
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
}

export interface CrossSourceValidation {
  sourcesSearched: string[];
  candidatesFound: number;
  verifiedCandidates: number;
  verificationRate: number;
  averageCrossSourceScore: number;
}
