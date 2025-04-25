
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
