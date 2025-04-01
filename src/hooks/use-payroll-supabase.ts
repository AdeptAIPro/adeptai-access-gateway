
import { useState, useEffect } from "react";
import { Employee } from "@/hooks/use-payroll";
import { toast } from "@/hooks/use-toast";
import { fetchEmployees, fetchEmployeeById, createEmployee, updateEmployee } from "@/services/payroll/PayrollService";

export function usePayrollEmployeesSupabase() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getEmployees = async () => {
    try {
      setIsLoading(true);
      const employeeData = await fetchEmployees();
      
      // If we get data back from Supabase, use it
      if (employeeData && employeeData.length > 0) {
        setEmployees(employeeData);
        setError(null);
      } else {
        // Fall back to mock data
        console.log("No employees found in Supabase, falling back to mock data");
        const { employees: mockEmployees } = await import("@/hooks/use-payroll").then(
          (module) => module.usePayrollEmployees()
        );
        
        if (mockEmployees && mockEmployees.length > 0) {
          setEmployees(mockEmployees);
          toast({
            title: "Using Mock Data",
            description: "No employee data found in database. Using sample data instead.",
            variant: "warning",
          });
        } else {
          setError("No employee data available");
          toast({
            title: "No Data Available",
            description: "Please add employees or seed the database with sample data.",
            variant: "warning",
          });
        }
      }
    } catch (err) {
      console.error("Error loading employees:", err);
      setError("Failed to load employees");
      
      // Fall back to mock data
      try {
        const { employees: mockEmployees } = await import("@/hooks/use-payroll").then(
          (module) => module.usePayrollEmployees()
        );
        
        if (mockEmployees && mockEmployees.length > 0) {
          setEmployees(mockEmployees);
          toast({
            title: "Using Mock Data",
            description: "Error connecting to database. Using sample data instead.",
            variant: "warning",
          });
        } else {
          toast({
            title: "Error",
            description: "Failed to load employees",
            variant: "destructive",
          });
        }
      } catch (mockErr) {
        toast({
          title: "Error",
          description: "Failed to load employees",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const addEmployee = async (employee: Omit<Employee, "id">): Promise<boolean> => {
    try {
      const newEmployee = await createEmployee(employee);
      if (newEmployee) {
        setEmployees(prev => [...prev, newEmployee]);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error adding employee:", error);
      toast({
        title: "Error",
        description: "Failed to add employee. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateEmployeeData = async (id: string, updates: Partial<Employee>): Promise<boolean> => {
    try {
      const updatedEmployee = await updateEmployee(id, updates);
      if (updatedEmployee) {
        setEmployees(prev => prev.map(emp => emp.id === id ? updatedEmployee : emp));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating employee:", error);
      toast({
        title: "Error",
        description: "Failed to update employee. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    employees,
    isLoading,
    error,
    addEmployee,
    updateEmployee: updateEmployeeData,
    refreshEmployees: getEmployees
  };
}

export function usePayrollEmployeeSupabase(employeeId: string | null) {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getEmployee = async () => {
      if (!employeeId) {
        setEmployee(null);
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        
        // Try to fetch from Supabase first
        const employeeData = await fetchEmployeeById(employeeId);
        
        // If we get data back from Supabase, use it
        if (employeeData) {
          setEmployee(employeeData);
          setError(null);
        } else {
          // Fall back to mock data
          console.log(`Employee ${employeeId} not found in Supabase, falling back to mock data`);
          const { employee: mockEmployee } = await import("@/hooks/use-payroll").then(
            (module) => module.usePayrollEmployee(employeeId)
          );
          
          if (mockEmployee) {
            setEmployee(mockEmployee);
            setError(null);
          } else {
            setError("Employee not found");
            toast({
              title: "Not Found",
              description: "Employee details could not be found",
              variant: "destructive",
            });
          }
        }
      } catch (err) {
        console.error("Error loading employee details:", err);
        setError("Failed to load employee details");
        
        // Fall back to mock data
        try {
          const { employee: mockEmployee } = await import("@/hooks/use-payroll").then(
            (module) => module.usePayrollEmployee(employeeId)
          );
          
          if (mockEmployee) {
            setEmployee(mockEmployee);
          } else {
            toast({
              title: "Error",
              description: "Failed to load employee details",
              variant: "destructive",
            });
          }
        } catch (mockErr) {
          toast({
            title: "Error",
            description: "Failed to load employee details",
            variant: "destructive",
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    getEmployee();
  }, [employeeId]);

  const updateEmployeeData = async (updates: Partial<Employee>): Promise<boolean> => {
    if (!employee) return false;
    
    try {
      const updatedEmployee = await updateEmployee(employee.id, updates);
      if (updatedEmployee) {
        setEmployee(updatedEmployee);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating employee:", error);
      toast({
        title: "Error",
        description: "Failed to update employee. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    employee,
    isLoading,
    error,
    updateEmployee: updateEmployeeData
  };
}
