
import { supabase, IntegrationRecord } from "@/lib/supabase";
import { handleError, tryCatch, ErrorType, createAppError } from "@/utils/error-handler";
import { reportApiError } from "@/services/error-reporting";
import { toast } from "sonner";

/**
 * Service for managing integration connections in the AdeptAI platform
 */

// Fetch integrations from Supabase
export const getIntegrations = async (category?: string): Promise<IntegrationRecord[]> => {
  try {
    console.log("Fetching integrations", category ? `for category: ${category}` : "for all categories");
    let query = supabase
      .from('integrations')
      .select('*');
    
    if (category && category !== 'All') {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query;
    
    if (error) {
      throw createAppError(
        `Error fetching integrations: ${error.message}`, 
        ErrorType.API, 
        error,
        { category }
      );
    }
    
    return data || [];
  } catch (error) {
    reportApiError("getIntegrations", error, { category });
    handleError(error, true);
    return []; // Return empty array as fallback
  }
};

// Connect an integration
export const connectIntegration = async (id: string, credentials: any): Promise<boolean> => {
  try {
    console.log("Connecting integration", id);
    
    // Validate credentials before proceeding
    if (!credentials || Object.keys(credentials).length === 0) {
      throw createAppError(
        "Invalid credentials provided", 
        ErrorType.VALIDATION,
        null,
        { id }
      );
    }
    
    const { error } = await supabase
      .from('integrations')
      .update({ connected: true, ...credentials })
      .eq('id', id);
    
    if (error) {
      throw createAppError(
        `Error connecting integration: ${error.message}`, 
        ErrorType.API, 
        error,
        { id }
      );
    }
    
    toast.success("Integration connected successfully");
    return true;
  } catch (error) {
    reportApiError("connectIntegration", error, { id });
    handleError(error, true);
    return false;
  }
};

// Disconnect an integration
export const disconnectIntegration = async (id: string): Promise<boolean> => {
  try {
    console.log("Disconnecting integration", id);
    const { error } = await supabase
      .from('integrations')
      .update({ 
        connected: false,
        api_key: null, // Remove sensitive credentials
        api_url: null
      })
      .eq('id', id);
    
    if (error) {
      throw createAppError(
        `Error disconnecting integration: ${error.message}`, 
        ErrorType.API, 
        error,
        { id }
      );
    }
    
    toast.success("Integration disconnected successfully");
    return true;
  } catch (error) {
    reportApiError("disconnectIntegration", error, { id });
    handleError(error, true);
    return false;
  }
};

// Get integration categories
export const getIntegrationCategories = async (): Promise<string[]> => {
  try {
    console.log("Fetching integration categories");
    // First attempt to get distinct categories from the database
    const { data, error } = await supabase
      .from('integrations')
      .select('category');
    
    if (error) {
      throw createAppError(
        `Error fetching integration categories: ${error.message}`, 
        ErrorType.API, 
        error
      );
    }
    
    // Process the data to get unique categories
    const categories = data ? [...new Set(data.map(item => item.category))] : [];
    return ["All", ...categories];
  } catch (error) {
    reportApiError("getIntegrationCategories", error, {});
    handleError(error, true);
    
    // Fallback categories if API fails
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

// Test an integration connection
export const testIntegrationConnection = async (id: string, credentials: any): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    console.log("Testing integration connection", id);
    
    // In a real implementation, this would make a test call to the integration's API
    // For now, we'll simulate a test based on credentials
    
    const [result, error] = await tryCatch(async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simple validation
      if (!credentials || !credentials.api_key) {
        throw createAppError(
          "API key is required", 
          ErrorType.VALIDATION,
          null,
          { id }
        );
      }
      
      return { success: true };
    });
    
    if (error) {
      throw error;
    }
    
    return { 
      success: true, 
      message: "Connection test successful" 
    };
  } catch (error) {
    reportApiError("testIntegrationConnection", error, { id });
    
    // Don't show toast here as the calling code will handle it
    const appError = handleError(error, false);
    
    return {
      success: false,
      message: appError.userFriendlyMessage || "Failed to test connection"
    };
  }
};
