
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

/**
 * Creates necessary tables in Supabase if they don't exist
 */
export const createPayrollTables = async (): Promise<boolean> => {
  try {
    // Check if the employees table exists
    const { error } = await supabase
      .from('employees')
      .select('count')
      .limit(1);
    
    if (error && error.message.includes('does not exist')) {
      console.log("Tables need to be created in Supabase Dashboard");
      toast({
        title: "Database Setup Required",
        description: "Please create the necessary tables in your Supabase project.",
        variant: "default",
      });
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error checking tables:", error);
    return false;
  }
};
