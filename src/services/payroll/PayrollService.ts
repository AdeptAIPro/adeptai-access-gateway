
import { supabase } from "@/lib/supabase";
import { Employee } from "@/hooks/use-payroll";
import { toast } from "@/hooks/use-toast";

const EMPLOYEES_TABLE = "employees";
const PAYROLL_HISTORY_TABLE = "payroll_history";

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

/**
 * Fetches all employees from Supabase
 */
export const fetchEmployees = async (): Promise<Employee[]> => {
  try {
    const { data, error } = await supabase
      .from(EMPLOYEES_TABLE)
      .select("*");
    
    if (error) {
      console.error("Error fetching employees:", error);
      throw error;
    }
    
    return data as Employee[] || [];
  } catch (error) {
    console.error("Failed to fetch employees:", error);
    // We'll still return the mockEmployees from the hook as fallback
    return [];
  }
};

/**
 * Fetches a single employee by ID
 */
export const fetchEmployeeById = async (id: string): Promise<Employee | null> => {
  try {
    const { data, error } = await supabase
      .from(EMPLOYEES_TABLE)
      .select("*")
      .eq("id", id)
      .single();
    
    if (error) {
      console.error("Error fetching employee:", error);
      throw error;
    }
    
    return data as Employee;
  } catch (error) {
    console.error(`Failed to fetch employee with ID ${id}:`, error);
    return null;
  }
};

/**
 * Creates a new employee in Supabase
 */
export const createEmployee = async (employee: Omit<Employee, "id">): Promise<Employee | null> => {
  try {
    const { data, error } = await supabase
      .from(EMPLOYEES_TABLE)
      .insert([employee])
      .select()
      .single();
    
    if (error) {
      console.error("Error creating employee:", error);
      throw error;
    }
    
    toast({
      title: "Employee Created",
      description: "The employee has been successfully added.",
    });
    
    return data as Employee;
  } catch (error) {
    console.error("Failed to create employee:", error);
    toast({
      title: "Error",
      description: "Failed to create employee. Please try again.",
      variant: "destructive",
    });
    return null;
  }
};

/**
 * Updates an existing employee in Supabase
 */
export const updateEmployee = async (id: string, updates: Partial<Employee>): Promise<Employee | null> => {
  try {
    const { data, error } = await supabase
      .from(EMPLOYEES_TABLE)
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    
    if (error) {
      console.error("Error updating employee:", error);
      throw error;
    }
    
    toast({
      title: "Employee Updated",
      description: "The employee information has been updated.",
    });
    
    return data as Employee;
  } catch (error) {
    console.error("Failed to update employee:", error);
    toast({
      title: "Error",
      description: "Failed to update employee. Please try again.",
      variant: "destructive",
    });
    return null;
  }
};

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
