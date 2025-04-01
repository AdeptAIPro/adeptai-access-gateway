
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
  matchingModelUsed: string;
  matchingTime: number;
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
