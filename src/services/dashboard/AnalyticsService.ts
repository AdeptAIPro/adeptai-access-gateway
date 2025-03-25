
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

// Get job statistics summary for the dashboard
export const getJobStatsSummary = async (): Promise<any> => {
  try {
    const { data, error } = await supabase.rpc('get_job_stats_summary');
    
    if (error) {
      console.error('Error fetching job stats summary:', error);
      throw error;
    }
    
    return data || {
      total: 1872,
      growth: 12,
      active: 643,
      closed: 229
    };
  } catch (error) {
    console.error('Failed to fetch job stats summary:', error);
    return {
      total: 1872,
      growth: 12,
      active: 643,
      closed: 229
    };
  }
};

// Fallback functions for when database is unavailable
const getFallbackJobMetrics = (timeframe: string) => {
  // Generate appropriate sample data based on timeframe
  if (timeframe === 'year') {
    return [
      { name: 'Jan', value: 342 },
      { name: 'Feb', value: 289 },
      { name: 'Mar', value: 438 },
      { name: 'Apr', value: 367 },
      { name: 'May', value: 512 },
      { name: 'Jun', value: 394 },
      { name: 'Jul', value: 287 },
      { name: 'Aug', value: 402 },
      { name: 'Sep', value: 527 },
      { name: 'Oct', value: 621 },
      { name: 'Nov', value: 472 },
      { name: 'Dec', value: 321 }
    ];
  } else if (timeframe === 'month') {
    return [
      { name: 'Week 1', value: 125 },
      { name: 'Week 2', value: 167 },
      { name: 'Week 3', value: 143 },
      { name: 'Week 4', value: 189 }
    ];
  } else {
    // Weekly data
    return [
      { name: 'Mon', value: 42 },
      { name: 'Tue', value: 53 },
      { name: 'Wed', value: 67 },
      { name: 'Thu', value: 48 },
      { name: 'Fri', value: 38 },
      { name: 'Sat', value: 12 },
      { name: 'Sun', value: 8 }
    ];
  }
};

const getFallbackCandidateMetrics = (timeframe: string) => {
  // Similar to jobs but with different numbers representing candidate applications
  if (timeframe === 'year') {
    return [
      { name: 'Jan', value: 527 },
      { name: 'Feb', value: 492 },
      { name: 'Mar', value: 683 },
      { name: 'Apr', value: 592 },
      { name: 'May', value: 749 },
      { name: 'Jun', value: 573 },
      { name: 'Jul', value: 462 },
      { name: 'Aug', value: 579 },
      { name: 'Sep', value: 682 },
      { name: 'Oct', value: 798 },
      { name: 'Nov', value: 632 },
      { name: 'Dec', value: 521 }
    ];
  } else if (timeframe === 'month') {
    return [
      { name: 'Week 1', value: 187 },
      { name: 'Week 2', value: 213 },
      { name: 'Week 3', value: 198 },
      { name: 'Week 4', value: 252 }
    ];
  } else {
    // Weekly data
    return [
      { name: 'Mon', value: 67 },
      { name: 'Tue', value: 82 },
      { name: 'Wed', value: 93 },
      { name: 'Thu', value: 72 },
      { name: 'Fri', value: 64 },
      { name: 'Sat', value: 23 },
      { name: 'Sun', value: 18 }
    ];
  }
};
