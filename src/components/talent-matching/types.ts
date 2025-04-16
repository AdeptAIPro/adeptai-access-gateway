
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
  avatar?: string;
  culturalFitScore?: number;
  complianceVerified?: boolean;
  certifications?: string[];
  implicitCompetencies?: string[];
  embeddings?: number[];
  historicalSuccessRate?: number;
  resumeText?: string;
  sourceUrl?: string;
  platform?: string;
  lastUpdated?: string;
  profileStatus?: 'active' | 'inactive' | 'pending';
  enrichmentStatus?: 'pending' | 'completed' | 'failed';
}

export interface CrossSourceValidation {
  sourcesSearched: string[];
  candidatesFound: number;
  verifiedCandidates: number;
  verificationRate: number;
  averageCrossSourceScore: number;
}

export interface MatchingInsightsData {
  talentPoolQuality: string;
  crossSourceStatistics: {
    totalCandidates: number;
    verifiedCandidates: number;
    verifiedPercentage: number;
    averageCrossSourceScore: number;
  };
  recommendedSourcingStrategy: {
    mostEffectiveSources: string[];
    recommendedSources: string[];
    suggestedOutreachOrder: string[];
    untappedSources: string[];
  };
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
  insights?: MatchingInsightsData;
  sourcesUsed?: string[];
  candidatesPerSource?: Record<string, number>;
}

export interface TabContent {
  title: string;
  content: ReactNode;
}

// Talent Data Acquisition Types
export interface DataSource {
  id: string;
  name: string;
  type: 'github' | 'linkedin' | 'indeed' | 'monster' | 'naukri' | 'portfolio' | 'dataset' | 'other';
  url?: string;
  status: 'active' | 'inactive' | 'pending';
  lastScraped?: string;
  candidatesCount: number;
  description?: string;
}

export interface ResumeParsingResult {
  originalText: string;
  name?: string;
  email?: string;
  phone?: string;
  extractedSkills: string[];
  inferredExperience?: number;
  location?: string;
  education?: string;
  source: string;
  sourceUrl?: string;
  confidence: number;
  error?: string;
}

export interface ImportStats {
  totalProcessed: number;
  successfulImports: number;
  failedImports: number;
  duplicatesFound: number;
  enrichmentPerformed: number;
  startTime: string;
  endTime: string;
  sources: string[];
}
