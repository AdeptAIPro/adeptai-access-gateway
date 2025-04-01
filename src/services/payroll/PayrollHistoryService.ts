
import { supabase } from "@/lib/supabase";
import { PAYROLL_HISTORY_TABLE, ensurePayrollTables } from "./utils/DatabaseUtils";

/**
 * Records payroll run in history
 */
export const recordPayrollRun = async (
  payrollData: {
    runDate: string;
    payPeriod: string;
    totalAmount: number;
    totalEmployees: number;
    status: "Processing" | "Complete" | "Failed";
  }
): Promise<any> => {
  try {
    // Check if table exists
    const tableExists = await ensurePayrollTables();
    if (!tableExists) {
      console.log("Payroll history table doesn't exist yet");
      return null;
    }
    
    const { data, error } = await supabase
      .from(PAYROLL_HISTORY_TABLE)
      .insert([payrollData])
      .select();
    
    if (error) {
      console.error("Error recording payroll run:", error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error("Failed to record payroll run:", error);
    return null;
  }
};

/**
 * Fetches payroll history
 */
export const fetchPayrollHistory = async (): Promise<any[]> => {
  try {
    // Check if table exists
    const tableExists = await ensurePayrollTables();
    if (!tableExists) {
      console.log("Payroll history table doesn't exist yet");
      return [];
    }
    
    const { data, error } = await supabase
      .from(PAYROLL_HISTORY_TABLE)
      .select("*")
      .order("runDate", { ascending: false });
    
    if (error) {
      console.error("Error fetching payroll history:", error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error("Failed to fetch payroll history:", error);
    return [];
  }
};
