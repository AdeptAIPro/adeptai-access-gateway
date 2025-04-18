
import { LucideIcon } from "lucide-react";

export interface ResumeParsingResult {
  id: string;
  filename: string;
  parsed: boolean;
  name?: string;
  candidateName?: string;
  skills?: string[];
  experience?: string[];
  education?: string[];
  contact?: {
    email?: string;
    phone?: string;
  };
  email?: string;
  phone?: string;
  extractedSkills?: string[];
  inferredExperience?: number;
  location?: string;
  originalText?: string;
  error?: string;
  source?: string;
  sourceUrl?: string;
  confidence?: number;
}

export interface MatchingOptions {
  matchingModel: string;
  weightSkills: number;
  weightExperience: number;
  weightEducation: number;
  threshold: number;
  includePartialMatches: boolean;
  
  // Additional properties used in the application
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

// Interface for a step in the talent matching guide
export interface Step {
  icon: React.ElementType;
  title: string;
  description: string;
  points: string[];
}

// Props for the Steps Guide component
export interface StepsGuideProps {
  steps: Step[];
}

// Interface for an AI model in the talent matching guide
export interface AIModel {
  icon: React.ElementType;
  name: string;
  description: string;
  accuracy: number;
  complexity: string;
  complexityColor: string;
}

// Props for the AI Models Section component
export interface AIModelsSectionProps {
  models: AIModel[];
}

// Props for the User Guide component
export interface UserGuideProps {
  steps?: Step[];
  models?: AIModel[];
}

export interface Candidate {
  id: string;
  name: string;
  title: string;
  location: string;
  skills: string[];
  experience: string | number;
  education?: string;
  matchScore: number;
  source: string;
  sourceUrl?: string;
  avatar?: string;
  crossSourceVerified?: boolean;
  crossSourceOccurrences?: number;
  crossSourceSources?: string[];
  crossSourceScore?: number;
  culturalFitScore?: number;
  complianceVerified?: boolean;
  certifications?: string[];
  implicitCompetencies?: string[];
  historicalSuccessRate?: number;
  contactInfo?: {
    email: string;
    phone: string;
  };
  resumeText?: string;
  profileStatus?: string;
  enrichmentStatus?: string;
  embeddings?: any;
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

export interface DataSource {
  id: string;
  name: string;
  type: string;
  url?: string;
  candidatesCount: number;
  lastUpdated: string;
  lastScraped?: string;
  status: 'active' | 'inactive' | 'pending' | 'error';
  icon?: React.ElementType;
  description?: string;
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

export interface ImportFormValues {
  sourceType: string;
  sourceName: string;
  resumeText?: string;
  fileUpload?: any;
  sourceUrl?: string;
}
