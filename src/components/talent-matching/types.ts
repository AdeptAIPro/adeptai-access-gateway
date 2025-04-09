
import { ReactNode } from "react";

export interface MatchingOptions {
  model: string;
  minMatchScore: number;
  useComplianceVerification: boolean;
  prioritizeCulturalFit: boolean;
  useSemanticMatching?: boolean;
  useRAG?: boolean;
  useSkillBasedFiltering?: boolean;
  matchingModel?: string;
  targetSources?: string[];
}

export interface MatchingModel {
  id: string;
  name: string;
  description: string;
  complexity: string;
  performance: number;
  accuracyScore: number;
  type: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
}

export interface Candidate {
  id: string;
  name: string;
  title: string;
  location: string;
  experience: number | string;
  skills: string[];
  salary?: number;
  availability?: string;
  source?: string;
  matchScore: number;
  skillMatchScore?: number;
  experienceMatchScore?: number;
  educationMatchScore?: number;
  contactInfo?: ContactInfo;
  education?: string;
  crossSourceVerified?: boolean;
  crossSourceOccurrences?: number;
  crossSourceSources?: string[];
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
  matchingModelUsed: string;
  totalCandidatesScanned: number;
  matchTime: number;
  crossSourceValidation?: CrossSourceValidation;
}

export interface TabContent {
  title: string;
  content: ReactNode;
}
