
export interface TalentSearchParams {
  skills?: string[];
  location?: string;
  experience?: number;
  source?: string;
  page?: number;
  limit?: number;
}

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

export interface TalentSearchResponse {
  candidates: Talent[];
  total: number;
  page: number;
  totalPages: number;
}
