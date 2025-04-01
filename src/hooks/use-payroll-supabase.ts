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
      
      // If we get data back from Supabase, use it, otherwise we'll use the mock data
      if (employeeData.length > 0) {
        setEmployees(employeeData);
      } else {
        // We'll import the usePayrollEmployees hook to get the mock data
        const { employees: mockEmployees } = await import("@/hooks/use-payroll").then(
          (module) => module.usePayrollEmployees()
        );
        setEmployees(mockEmployees);
      }
      setError(null);
    } catch (err) {
      setError("Failed to load employees");
      toast({
        title: "Error",
        description: "Failed to load employees",
        variant: "destructive",
      });
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
        } else {
          // Fall back to mock data
          const { employee: mockEmployee } = await import("@/hooks/use-payroll").then(
            (module) => module.usePayrollEmployee(employeeId)
          );
          setEmployee(mockEmployee);
        }
        setError(null);
      } catch (err) {
        setError("Failed to load employee details");
        toast({
          title: "Error",
          description: "Failed to load employee details",
          variant: "destructive",
        });
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
