
import { useState, useEffect } from "react";
import { fetchEmployees, addEmployee as addEmployeeService } from "@/services/payroll/EmployeeService";
import { fetchCompanyPayrollSettings } from "@/services/payroll/CompanyPayrollSettings";
import { toast } from "sonner";

export function usePayrollEmployeesSupabase() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        toast.error("Failed to load employees");
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
        toast.error("Failed to load company payroll settings");
      }
    };

    loadSettings();
  }, []);

  // Add employee function
  const addEmployee = async (employeeData: any) => {
    try {
      const newEmployee = await addEmployeeService(employeeData);
      
      // Update local state
      setEmployees(prevEmployees => [...prevEmployees, newEmployee]);
      
      toast.success("Employee added successfully");
      return true;
    } catch (err) {
      console.error("Error adding employee:", err);
      toast.error("Failed to add employee");
      return false;
    }
  };

  // Update employee function
  const updateEmployee = async (id: string, updates: any) => {
    try {
      // In a real app with Supabase, you'd update the database here
      // For now, we'll just update the local state
      
      setEmployees(prevEmployees => 
        prevEmployees.map(emp => 
          emp.id === id ? { ...emp, ...updates } : emp
        )
      );
      
      toast.success("Employee updated successfully");
      return true;
    } catch (err) {
      console.error("Error updating employee:", err);
      toast.error("Failed to update employee");
      return false;
    }
  };

  // Delete employee function
  const deleteEmployee = async (id: string) => {
    try {
      // In a real app with Supabase, you'd delete from the database here
      // For now, we'll just update the local state
      
      setEmployees(prevEmployees => 
        prevEmployees.filter(emp => emp.id !== id)
      );
      
      toast.success("Employee deleted successfully");
      return true;
    } catch (err) {
      console.error("Error deleting employee:", err);
      toast.error("Failed to delete employee");
      return false;
    }
  };

  // Employee payroll calculations
  const calculatePayroll = async (employeeId: string, options = {}) => {
    try {
      const employee = employees.find(emp => emp.id === employeeId);
      
      if (!employee) {
        throw new Error("Employee not found");
      }
      
      // In a real app, you would call a Supabase function or Edge function to do this
      // For now, we'll simulate some calculations
      
      // Simulated response
      const payrollResult = {
        employeeId: employee.id,
        employeeName: employee.name,
        grossPay: 3000,
        deductions: 750,
        netPay: 2250,
        payPeriod: "April 1-15, 2023",
        payDate: "April 20, 2023",
        taxWithholdings: {
          federal: 450,
          state: 150,
          medicare: 75,
          socialSecurity: 75
        },
        otherDeductions: {
          retirement: 0,
          health: 0
        }
      };
      
      toast.success("Payroll calculated successfully");
      return payrollResult;
    } catch (err) {
      console.error("Error calculating payroll:", err);
      toast.error("Failed to calculate payroll");
      throw err;
    }
  };

  // Run payroll function
  const runPayroll = async (options = {}) => {
    try {
      // In a real app, this would call a Supabase function to process payroll
      // For now, simulate the operation
      
      toast.success("Processing payroll...");
      
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate results
      const payrollResults = {
        success: true,
        processingDate: new Date().toISOString(),
        employeesProcessed: employees.length,
        totalGrossPay: 65000,
        totalNetPay: 48750,
        totalTaxes: 16250,
        payPeriod: "April 1-15, 2023",
        payDate: "April 20, 2023"
      };
      
      toast.success("Payroll completed successfully");
      return payrollResults;
    } catch (err) {
      console.error("Error running payroll:", err);
      toast.error("Failed to run payroll");
      throw err;
    }
  };

  // Return values and functions
  return {
    employees,
    isLoading,
    error,
    settings,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    calculatePayroll,
    runPayroll
  };
}
