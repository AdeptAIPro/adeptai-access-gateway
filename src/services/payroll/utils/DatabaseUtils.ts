
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

export const EMPLOYEES_TABLE = "employees";
export const PAYROLL_HISTORY_TABLE = "payroll_history";

/**
 * Checks if we need to create the necessary tables in Supabase
 */
export const ensurePayrollTables = async (): Promise<boolean> => {
  try {
    // Check if employees table exists by attempting to select from it
    const { error } = await supabase
      .from(EMPLOYEES_TABLE)
      .select('count')
      .limit(1);
    
    if (error && error.message.includes('does not exist')) {
      console.log("Tables do not exist. This would be where we create them if needed.");
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error checking tables:", error);
    return false;
  }
};
