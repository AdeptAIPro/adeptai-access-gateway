
import { useState, useEffect } from "react";
import { Employee } from "@/types/employee";
import { mockEmployees } from "@/data/mockEmployees";
import { toast } from "@/hooks/use-toast";

/**
 * Hook to fetch and manage all payroll employees
 */
export function usePayrollEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        // In a real app, you would fetch from your API
        setIsLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setEmployees(mockEmployees);
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

    fetchEmployees();
  }, []);

  return {
    employees,
    isLoading,
    error,
  };
}

/**
 * Hook to fetch and manage a single payroll employee
 */
export function usePayrollEmployee(employeeId: string | null) {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!employeeId) {
        setEmployee(null);
        setIsLoading(false);
        return;
      }
      
      try {
        // In a real app, you would fetch from your API
        setIsLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const foundEmployee = mockEmployees.find(emp => emp.id === employeeId) || null;
        setEmployee(foundEmployee);
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

    fetchEmployee();
  }, [employeeId]);

  return {
    employee,
    isLoading,
    error,
  };
}
