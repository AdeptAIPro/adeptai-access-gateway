
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import { sampleEmployees } from "../data/SampleEmployeeData";
import { createPayrollTables } from "../utils/PayrollDatabaseUtils";

/**
 * Seeds the database with sample employee data
 */
export const seedEmployeeData = async (): Promise<boolean> => {
  try {
    // First check if tables exist
    const tablesExist = await createPayrollTables();
    if (!tablesExist) {
      return false;
    }
    
    // Check if data already exists
    const { data: existingData, error: checkError } = await supabase
      .from('employees')
      .select('id')
      .limit(1);
      
    if (checkError) {
      console.error("Error checking existing data:", checkError);
      return false;
    }
    
    if (existingData && existingData.length > 0) {
      // Data already exists, ask before overwriting
      console.log("Sample data already exists");
      toast({
        title: "Sample Data Already Exists",
        description: "Additional sample data has been added to your database.",
      });
    }
    
    // Insert sample data
    for (const employee of sampleEmployees) {
      const { error } = await supabase
        .from('employees')
        .insert([employee]);
        
      if (error) {
        console.error("Error inserting employee:", error);
        toast({
          title: "Error",
          description: "Failed to add sample employee data",
          variant: "destructive",
        });
        return false;
      }
    }
    
    toast({
      title: "Success",
      description: "Sample employee data has been added to your database",
    });
    
    return true;
  } catch (error) {
    console.error("Error seeding employee data:", error);
    toast({
      title: "Error",
      description: "Failed to add sample employee data",
      variant: "destructive",
    });
    return false;
  }
};
