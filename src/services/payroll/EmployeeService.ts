
import { supabase } from "@/lib/supabase";
import { Employee } from "@/types/employee";
import { toast } from "@/hooks/use-toast";
import { EMPLOYEES_TABLE, ensurePayrollTables } from "./utils/DatabaseUtils";

/**
 * Fetches all employees from Supabase
 */
export const fetchEmployees = async (): Promise<Employee[]> => {
  try {
    // First check if the table exists
    const tableExists = await ensurePayrollTables();
    if (!tableExists) {
      console.log("Employees table doesn't exist yet");
      return [];
    }
    
    const { data, error } = await supabase
      .from(EMPLOYEES_TABLE)
      .select("*");
    
    if (error) {
      console.error("Error fetching employees:", error);
      toast({
        title: "Error",
        description: "Failed to fetch employees from database",
        variant: "destructive",
      });
      throw error;
    }
    
    return data as Employee[] || [];
  } catch (error) {
    console.error("Failed to fetch employees:", error);
    toast({
      title: "Database Error",
      description: "Failed to load employees. Please check your database connection.",
      variant: "destructive",
    });
    // We'll still return an empty array as fallback
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
      if (error.code === 'PGRST116') { // Record not found error code
        console.log(`Employee with ID ${id} not found`);
        return null;
      }
      console.error("Error fetching employee:", error);
      throw error;
    }
    
    return data as Employee;
  } catch (error) {
    console.error(`Failed to fetch employee with ID ${id}:`, error);
    toast({
      title: "Error",
      description: "Failed to load employee details",
      variant: "destructive",
    });
    return null;
  }
};

/**
 * Creates a new employee in Supabase
 */
export const createEmployee = async (employee: Omit<Employee, "id">): Promise<Employee | null> => {
  try {
    // First check if the table exists
    const tableExists = await ensurePayrollTables();
    if (!tableExists) {
      toast({
        title: "Database Setup Required",
        description: "Please create the necessary tables in your Supabase project.",
        variant: "default",
      });
      return null;
    }
    
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
