
export interface Talent {
  id: string;
  name: string;
  title: string;
  location: string;
  skills: string[];
  experience: number;
  education: string;
  source: string;
  avatar?: string;
  email?: string;
  phone?: string;
  availability?: string;
  rate?: string;
  bio?: string;
}

export interface TalentSearchParams {
  skills?: string[];
  location?: string;
  experience?: number;
  source?: string;
  sources?: string[]; // Added sources array for multiple source selection
  query?: string;     // Add the query property
  page?: number;
  limit?: number;
}

export interface TalentSearchResponse {
  candidates: Talent[];
  total: number;
  page: number;
  totalPages: number;
  timestamp?: number;  // Add the timestamp property with optional type
}
