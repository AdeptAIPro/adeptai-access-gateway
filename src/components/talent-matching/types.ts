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
}

export interface MatchingModel {
  id: string;
  name: string;
  type: "openai" | "tensorflow" | "pytorch" | "hybrid";
  description: string;
  capabilities?: string[];
}

export interface MatchingResult {
  candidates: Candidate[];
  jobTitle?: string;
  extractedSkills?: string[];
  suggestedExperience?: number;
  keyResponsibilities?: string[];
  matchingModelUsed?: string;
  totalCandidatesScanned?: number;
  matchTime?: number;
  
  // Cross-source intelligence fields
  insights?: {
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
  };
  crossSourceValidation?: {
    candidatesFound: number;
    sourcesSearched: string[];
    averageCrossSourceScore: number;
  };
  outreachStrategies?: Array<{
    candidateId: string;
    candidateName: string;
    recommendedApproach: string;
    suggestedTalkingPoints: string[];
    estimatedResponseRate: string;
    bestContactMethod: string;
  }>;
}

export interface MatchingCriteria {
  skills: boolean;
  experience: boolean;
  education: boolean;
  location: boolean;
  culturalFit: boolean;
  compliance: boolean;
}

export interface MatchingOptions {
  useSemanticMatching: boolean;
  useSkillBasedFiltering: boolean;
  useComplianceVerification: boolean;
  useRAG: boolean;
  matchingModel: string;
  minMatchScore: number;
}
