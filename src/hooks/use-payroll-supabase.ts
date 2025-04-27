
import { useState, useEffect } from "react";
import { fetchEmployees, addEmployee as addEmployeeService, updateEmployee as updateEmployeeService } from "@/services/payroll/EmployeeService";
import { fetchCompanyPayrollSettings } from "@/services/payroll/CompanyPayrollSettings";
import { toast } from "@/hooks/use-toast";
import { runPayroll } from "@/services/payroll/PayrollProcessor";
import { PayrollRunOptions } from "@/services/payroll/types/PayrollTypes";
import BankValidationService from "@/services/payroll/payment/BankValidationService";
import W2GenerationService from "@/services/payroll/compliance/W2GenerationService";
import TimeTrackingService from "@/services/payroll/time/TimeTrackingService";

export function usePayrollEmployeesSupabase() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [taxDeadlines, setTaxDeadlines] = useState<any[]>([]);

  // Fetch employees
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        setIsLoading(true);
        const data = await fetchEmployees();
        setEmployees(data);
      } catch (err) {
        console.error("Error fetching employees:", err);
        setError("Failed to load employees");
        toast({
          title: "Error",
          description: "Failed to load employees",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadEmployees();
  }, []);

  // Fetch company payroll settings
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settingsData = await fetchCompanyPayrollSettings();
        setSettings(settingsData);
      } catch (err) {
        console.error("Error fetching payroll settings:", err);
        toast({
          title: "Error",
          description: "Failed to load company payroll settings",
          variant: "destructive"
        });
      }
    };

    loadSettings();
  }, []);

  // Load tax filing deadlines
  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    
    const deadlines = [
      {
        name: "Form 941 (Q1)",
        deadline: `${year}-04-30`,
        type: "federal",
        status: "upcoming"
      },
      {
        name: "Form 941 (Q2)",
        deadline: `${year}-07-31`,
        type: "federal",
        status: "upcoming"
      },
      {
        name: "Form 941 (Q3)",
        deadline: `${year}-10-31`,
        type: "federal",
        status: "upcoming"
      },
      {
        name: "Form 941 (Q4)",
        deadline: `${year+1}-01-31`,
        type: "federal",
        status: "upcoming"
      },
      {
        name: "W-2 Distribution",
        deadline: `${year+1}-01-31`,
        type: "federal",
        status: "upcoming"
      },
      {
        name: "Form 940",
        deadline: `${year+1}-01-31`,
        type: "federal",
        status: "upcoming"
      },
      {
        name: "1099-NEC Distribution",
        deadline: `${year+1}-01-31`,
        type: "federal",
        status: "upcoming"
      },
      {
        name: "Texas Unemployment Tax (Q1)",
        deadline: `${year}-04-30`,
        type: "state",
        state: "Texas",
        status: "upcoming"
      }
    ];
    
    // Calculate status based on current date
    const updatedDeadlines = deadlines.map(deadline => {
      const deadlineDate = new Date(deadline.deadline);
      const today = new Date();
      
      if (deadlineDate < today) {
        deadline.status = "past";
      } else if ((deadlineDate.getTime() - today.getTime()) < (30 * 24 * 60 * 60 * 1000)) {
        deadline.status = "soon";
      }
      
      return deadline;
    });
    
    setTaxDeadlines(updatedDeadlines);
  }, []);

  // Add employee function
  const addEmployee = async (employeeData: any) => {
    try {
      const newEmployee = await addEmployeeService(employeeData);
      
      // Update local state
      setEmployees(prevEmployees => [...prevEmployees, newEmployee]);
      
      toast({
        title: "Success",
        description: "Employee added successfully",
        variant: "default"
      });
      return true;
    } catch (err) {
      console.error("Error adding employee:", err);
      toast({
        title: "Error",
        description: "Failed to add employee",
        variant: "destructive"
      });
      return false;
    }
  };

  // Update employee function
  const updateEmployee = async (id: string, updates: any) => {
    try {
      const updatedEmployee = await updateEmployeeService(id, updates);
      
      if (updatedEmployee) {
        // Update local state
        setEmployees(prevEmployees => 
          prevEmployees.map(emp => 
            emp.id === id ? { ...emp, ...updatedEmployee } : emp
          )
        );
        
        toast({
          title: "Success",
          description: "Employee updated successfully",
          variant: "default"
        });
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error updating employee:", err);
      toast({
        title: "Error",
        description: "Failed to update employee",
        variant: "destructive"
      });
      return false;
    }
  };

  // Delete employee function
  const deleteEmployee = async (id: string) => {
    try {
      // In a real app with Supabase, you'd delete the database here
      // For now, we'll just update the local state
      
      setEmployees(prevEmployees => 
        prevEmployees.filter(emp => emp.id !== id)
      );
      
      toast({
        title: "Success",
        description: "Employee deleted successfully",
        variant: "default"
      });
      return true;
    } catch (err) {
      console.error("Error deleting employee:", err);
      toast({
        title: "Error",
        description: "Failed to delete employee",
        variant: "destructive"
      });
      return false;
    }
  };

  // Run payroll function with our enhanced options
  const runPayrollProcess = async (options: PayrollRunOptions) => {
    try {
      toast({
        title: "Processing Payroll",
        description: "Starting payroll processing...",
        variant: "default"
      });
      
      // If we need to verify bank accounts first
      if (options.verifyCompliance) {
        let employeesToVerify = [];
        
        if (options.individualEmployeeId) {
          const employee = employees.find(e => e.id === options.individualEmployeeId);
          if (employee) {
            employeesToVerify = [employee];
          }
        } else {
          employeesToVerify = employees;
        }
        
        // Verify bank accounts
        let allValid = true;
        for (const emp of employeesToVerify) {
          const isValid = await BankValidationService.validateEmployeeBankInfo(emp);
          if (!isValid) {
            allValid = false;
          }
        }
        
        if (!allValid) {
          toast({
            title: "Bank Validation Failed",
            description: "Some employees have invalid bank information. Please correct before running payroll.",
            variant: "destructive"
          });
          return null;
        }
      }
      
      // Process the payroll
      const result = await runPayroll(options);
      
      if (result.status === "Completed" || result.status === "Partial") {
        return result;
      } else {
        toast({
          title: "Payroll Failed",
          description: "There was an error processing payroll.",
          variant: "destructive"
        });
        return null;
      }
    } catch (err) {
      console.error("Error running payroll:", err);
      toast({
        title: "Error",
        description: "Failed to run payroll",
        variant: "destructive"
      });
      throw err;
    }
  };

  // Generate W-2 forms
  const generateW2Forms = async (year: number, employeeIds?: string[]) => {
    try {
      toast({
        title: "Generating W-2 Forms",
        description: "Starting W-2 generation process...",
        variant: "default"
      });
      
      // Mock employer data for demo
      const employerData = {
        name: settings?.companyName || "Sample Company, Inc.",
        ein: settings?.ein || "12-3456789",
        address: settings?.address || {
          street: "123 Business St",
          city: "Austin",
          state: "TX",
          zip: "78701"
        }
      };
      
      // Filter employees if specific IDs provided
      let targetEmployees = employees;
      if (employeeIds && employeeIds.length > 0) {
        targetEmployees = employees.filter(emp => employeeIds.includes(emp.id));
      }
      
      // Mock year data for demo
      const yearData = {
        year: year,
        wages: 75000,
        federalWithholding: 9500,
        socialSecurityWages: 75000,
        socialSecurityWithholding: 4650,
        medicareWages: 75000,
        medicareWithholding: 1087.50,
        stateWages: 75000,
        stateWithholding: 0 // Texas has no state income tax
      };
      
      // Process each employee
      const results = [];
      for (const employee of targetEmployees) {
        const result = await W2GenerationService.generateW2(
          employee,
          yearData,
          employerData
        );
        
        results.push({
          employeeId: employee.id,
          employeeName: `${employee.firstName} ${employee.lastName}`,
          success: result.success,
          fileUrl: result.file_url,
          error: result.error
        });
      }
      
      const successCount = results.filter(r => r.success).length;
      
      toast({
        title: "W-2 Generation Complete",
        description: `Successfully generated ${successCount} of ${results.length} W-2 forms`,
        variant: successCount === results.length ? "default" : "default"
      });
      
      return results;
    } catch (err) {
      console.error("Error generating W-2 forms:", err);
      toast({
        title: "Error",
        description: "Failed to generate W-2 forms",
        variant: "destructive"
      });
      throw err;
    }
  };

  // Validate time entries
  const validateTimeEntries = (employeeId: string, timeTracking: any) => {
    try {
      const employee = employees.find(emp => emp.id === employeeId);
      if (!employee) {
        return { valid: false, errors: ["Employee not found"] };
      }
      
      return TimeTrackingService.validateTimeTracking(timeTracking);
    } catch (err) {
      console.error("Error validating time entries:", err);
      return { valid: false, errors: ["Error validating time entries"] };
    }
  };

  // Return values and functions
  return {
    employees,
    isLoading,
    error,
    settings,
    taxDeadlines,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    runPayroll: runPayrollProcess,
    generateW2Forms,
    validateTimeEntries,
    validateBankAccount: BankValidationService.validateBankAccount
  };
}
