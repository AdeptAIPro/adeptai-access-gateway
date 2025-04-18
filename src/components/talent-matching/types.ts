
export interface ResumeParsingResult {
  id: string;
  filename: string;
  parsed: boolean;
  candidateName?: string;
  skills?: string[];
  experience?: string[];
  education?: string[];
  contact?: {
    email?: string;
    phone?: string;
  };
  error?: string;
}

export interface MatchingOptions {
  matchingModel: string;
  weightSkills: number;
  weightExperience: number;
  weightEducation: number;
  threshold: number;
  includePartialMatches: boolean;
}

export interface MatchingModel {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
  isCustom: boolean;
}
