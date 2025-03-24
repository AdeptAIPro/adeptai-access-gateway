
import { supabase, IntegrationRecord } from "@/lib/supabase";

/**
 * Service for managing integration connections in the AdeptAI platform
 */

// Fetch integrations from Supabase
export const getIntegrations = async (category?: string): Promise<IntegrationRecord[]> => {
  try {
    let query = supabase
      .from('integrations')
      .select('*');
    
    if (category && category !== 'All') {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching integrations:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Failed to fetch integrations:', error);
    return []; // Return empty array as fallback
  }
};

// Connect an integration
export const connectIntegration = async (id: string, credentials: any): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('integrations')
      .update({ connected: true, ...credentials })
      .eq('id', id);
    
    if (error) {
      console.error('Error connecting integration:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Failed to connect integration:', error);
    return false;
  }
};

// Disconnect an integration
export const disconnectIntegration = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('integrations')
      .update({ 
        connected: false,
        api_key: null, // Remove sensitive credentials
        api_url: null
      })
      .eq('id', id);
    
    if (error) {
      console.error('Error disconnecting integration:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Failed to disconnect integration:', error);
    return false;
  }
};

// Get integration categories
export const getIntegrationCategories = async (): Promise<string[]> => {
  try {
    // First attempt to get distinct categories from the database
    const { data, error } = await supabase
      .from('integrations')
      .select('category');
    
    if (error) {
      console.error('Error fetching integration categories:', error);
      throw error;
    }
    
    // Process the data to get unique categories
    const categories = data ? [...new Set(data.map(item => item.category))] : [];
    return ["All", ...categories];
  } catch (error) {
    console.error('Failed to fetch integration categories:', error);
    return [
      "All",
      "VMS Systems",
      "ATS",
      "Paid Job Boards",
      "Free Job Posting",
      "Social",
      "Productivity",
      "Compliance Boards",
      "Background Boards",
      "Onboarding Boards",
      "CRM & HRMS"
    ];
  }
};
