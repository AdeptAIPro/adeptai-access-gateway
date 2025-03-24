
import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and anon key from environment variables or configure them directly
// In production, you would use environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-supabase-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

// Log warning if missing real credentials
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Missing Supabase URL or anon key. Using mock data fallbacks instead of real database connection.');
}

// Create a mock Supabase client that returns fallback data when real credentials aren't available
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for our Supabase tables
export type CandidateRecord = {
  id: string;
  name: string;
  title: string;
  location: string;
  education: string;
  experience: number;
  skills: string[];
  match_score?: number;
  source: string;
  avatar_url: string;
  cultural_fit_score?: number;
  compliance_verified?: boolean;
  certifications?: string[];
  implicit_competencies?: string[];
  historical_success_rate?: number;
  created_at?: string;
};

export type JobRecord = {
  id: string;
  title: string;
  description: string;
  location: string;
  company: string;
  salary_range?: string;
  job_type: string;
  requirements?: string[];
  external_id?: string;
  source: string;
  created_at?: string;
};

export type IntegrationRecord = {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  connected: boolean;
  api_key?: string;
  api_url?: string;
  created_at?: string;
};
