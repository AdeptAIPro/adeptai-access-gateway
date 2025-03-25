
import { MatchingModel } from "@/components/talent-matching/types";
import { supabase } from "@/lib/supabase";

/**
 * Fetches available matching models from the database
 */
export const getAvailableMatchingModelsFromDatabase = async (): Promise<MatchingModel[]> => {
  try {
    const { data, error } = await supabase
      .from('matching_models')
      .select('*');
    
    if (error) {
      throw error;
    }
    
    if (data && data.length > 0) {
      return data as MatchingModel[];
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching matching models from database:", error);
    return [];
  }
};
