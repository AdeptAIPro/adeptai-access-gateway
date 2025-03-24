
import { supabase } from "@/lib/supabase";

/**
 * Service for retrieving analytics data for the dashboard
 */

// Get job metrics for dashboard
export const getJobMetrics = async (timeframe: string = 'month'): Promise<any> => {
  try {
    // Example query - in a real app, this would use SQL functions in Supabase
    const { data, error } = await supabase
      .rpc('get_job_metrics', { timeframe_param: timeframe });
    
    if (error) {
      console.error('Error fetching job metrics:', error);
      throw error;
    }
    
    return data || getFallbackJobMetrics(timeframe);
  } catch (error) {
    console.error('Failed to fetch job metrics:', error);
    return getFallbackJobMetrics(timeframe);
  }
};

// Get candidate metrics for dashboard
export const getCandidateMetrics = async (timeframe: string = 'month'): Promise<any> => {
  try {
    const { data, error } = await supabase
      .rpc('get_candidate_metrics', { timeframe_param: timeframe });
    
    if (error) {
      console.error('Error fetching candidate metrics:', error);
      throw error;
    }
    
    return data || getFallbackCandidateMetrics(timeframe);
  } catch (error) {
    console.error('Failed to fetch candidate metrics:', error);
    return getFallbackCandidateMetrics(timeframe);
  }
};

// Fallback functions for when database is unavailable
const getFallbackJobMetrics = (timeframe: string) => {
  // Generate appropriate sample data based on timeframe
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  if (timeframe === 'year') {
    return months.map(month => ({
      name: month,
      value: Math.floor(Math.random() * 500) + 100
    }));
  } else if (timeframe === 'month') {
    return months.slice(0, 6).map(month => ({
      name: month,
      value: Math.floor(Math.random() * 500) + 100
    }));
  } else {
    // Weekly data
    return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => ({
      name: day,
      value: Math.floor(Math.random() * 100) + 20
    }));
  }
};

const getFallbackCandidateMetrics = (timeframe: string) => {
  // Similar to jobs but with different numbers
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  if (timeframe === 'year') {
    return months.map(month => ({
      name: month,
      value: Math.floor(Math.random() * 300) + 50
    }));
  } else if (timeframe === 'month') {
    return months.slice(0, 6).map(month => ({
      name: month,
      value: Math.floor(Math.random() * 300) + 50
    }));
  } else {
    // Weekly data
    return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => ({
      name: day,
      value: Math.floor(Math.random() * 70) + 10
    }));
  }
};
