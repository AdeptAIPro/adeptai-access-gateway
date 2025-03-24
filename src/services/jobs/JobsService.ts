
import { supabase, JobRecord } from "@/lib/supabase";

/**
 * Service for handling job data from various sources using Supabase
 */

// Fetch all jobs
export const getJobs = async (source?: string): Promise<JobRecord[]> => {
  try {
    let query = supabase
      .from('jobs')
      .select('*');
    
    if (source && source !== 'all') {
      query = query.eq('source', source);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    return []; // Return empty array as fallback
  }
};

// Post a new job
export const postJob = async (job: Partial<JobRecord>): Promise<JobRecord | null> => {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .insert([job])
      .select()
      .single();
    
    if (error) {
      console.error('Error posting job:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Failed to post job:', error);
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

// Delete a job
export const deleteJob = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting job:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Failed to delete job:', error);
    return false;
  }
};

// Get job sources
export const getJobSources = async (): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('source')
      .distinct();
    
    if (error) {
      console.error('Error fetching job sources:', error);
      throw error;
    }
    
    return data?.map(item => item.source) || [];
  } catch (error) {
    console.error('Failed to fetch job sources:', error);
    return ["linkedin", "ceipal", "indeed", "glassdoor", "ziprecruiter"];
  }
};
