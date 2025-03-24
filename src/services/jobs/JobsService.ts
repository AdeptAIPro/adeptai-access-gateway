
import { supabase, JobRecord } from "@/lib/supabase";

/**
 * Service for managing jobs and job sources in the AdeptAI platform
 */

// Fetch jobs from Supabase
export const getJobs = async (
  searchTerm?: string,
  source?: string,
  limit = 50,
  offset = 0
): Promise<JobRecord[]> => {
  try {
    let query = supabase
      .from('jobs')
      .select('*');
    
    // Apply filters
    if (searchTerm) {
      query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
    }
    
    if (source && source !== 'All') {
      query = query.eq('source', source);
    }
    
    // Apply pagination
    query = query.range(offset, offset + limit - 1);
    
    // Execute the query
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    return getMockJobs(); // Return mock data as fallback
  }
};

// Get job by ID
export const getJobById = async (id: string): Promise<JobRecord | null> => {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching job:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Failed to fetch job:', error);
    return null;
  }
};

// Create a new job
export const createJob = async (job: Omit<JobRecord, 'id' | 'created_at'>): Promise<JobRecord | null> => {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .insert([job])
      .select();
    
    if (error) {
      console.error('Error creating job:', error);
      throw error;
    }
    
    return data && data[0] ? data[0] : null;
  } catch (error) {
    console.error('Failed to create job:', error);
    return null;
  }
};

// Update an existing job
export const updateJob = async (id: string, updates: Partial<JobRecord>): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('jobs')
      .update(updates)
      .eq('id', id);
    
    if (error) {
      console.error('Error updating job:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Failed to update job:', error);
    return false;
  }
};

// Get job sources
export const getJobSources = async (): Promise<string[]> => {
  try {
    // Fetch all unique sources
    const { data, error } = await supabase
      .from('jobs')
      .select('source');
    
    if (error) {
      console.error('Error fetching job sources:', error);
      throw error;
    }
    
    // Process the data to get unique sources
    const sources = data ? [...new Set(data.map(item => item.source))] : [];
    return ["All", ...sources];
  } catch (error) {
    console.error('Failed to fetch job sources:', error);
    return [
      "All",
      "LinkedIn",
      "Indeed",
      "Glassdoor",
      "ZipRecruiter",
      "Company Website",
      "Referral",
      "Ceipal",
      "Other"
    ];
  }
};

// Fallback function that returns mock jobs when the database is unavailable
const getMockJobs = (): JobRecord[] => {
  return [
    {
      id: "1",
      title: "Senior Full Stack Developer",
      description: "Looking for a skilled full stack developer with experience in React, Node.js, and cloud services.",
      location: "San Francisco, CA",
      company: "TechCorp Inc.",
      salary_range: "$120,000 - $150,000",
      job_type: "Full-time",
      requirements: ["5+ years experience", "React", "Node.js", "Cloud services"],
      external_id: "TC-12345",
      source: "LinkedIn",
      created_at: new Date().toISOString()
    },
    {
      id: "2",
      title: "DevOps Engineer",
      description: "Seeking a DevOps engineer to build and maintain CI/CD pipelines and cloud infrastructure.",
      location: "Remote",
      company: "InnovateSoft",
      salary_range: "$110,000 - $140,000",
      job_type: "Full-time",
      requirements: ["3+ years DevOps experience", "AWS", "Kubernetes", "Terraform"],
      external_id: "IS-67890",
      source: "Indeed",
      created_at: new Date().toISOString()
    },
    {
      id: "3",
      title: "Frontend Developer",
      description: "Join our team to build modern web applications with React and TypeScript.",
      location: "New York, NY",
      company: "WebDesign Co.",
      salary_range: "$90,000 - $120,000",
      job_type: "Full-time",
      requirements: ["3+ years frontend experience", "React", "TypeScript", "CSS"],
      external_id: "WD-24680",
      source: "Glassdoor",
      created_at: new Date().toISOString()
    }
  ];
};
