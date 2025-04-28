
import { Employee } from '@/types/employee';

// Define PayrollRunOptions interface
export interface PayrollRunOptions {
  payPeriodStart?: string;
  payPeriodEnd?: string;
  paymentDate?: string;
  employeeIds?: string[];
  includeAllEmployees?: boolean;
  payrollType?: 'regular' | 'bonus' | 'commission' | 'other';
  payFrequency?: 'weekly' | 'biweekly' | 'monthly' | 'semi-monthly';
}

// Define PayrollRunResult interface
export interface PayrollRunResult {
  id: string;
  status: 'completed' | 'failed' | 'processing';
  payrollDate: string;
  totalPaid: number;
  employeesCount: number;
  payPeriodStart: string;
  payPeriodEnd: string;
  processedEmployees?: Array<{
    employeeId: string;
    amount: number;
    status: 'success' | 'failed';
    error?: string;
  }>;
  error?: string;
}

// Define PayrollHistory interface
export interface PayrollHistory {
  id: string;
  runDate: string;
  payPeriodStart: string;
  payPeriodEnd: string;
  totalAmount: number;
  employeeCount: number;
  status: 'completed' | 'processing' | 'failed';
  type: 'regular' | 'bonus' | 'other';
}

// Define PayrollCalculationResult interface
export interface PayrollCalculationResult {
  grossPay: number;
  netPay: number;
  taxes: {
    federal: number;
    state: number;
    local: number;
    fica: {
      socialSecurity: number;
      medicare: number;
    };
  };
  deductions: {
    [key: string]: number;
  };
  year: number;
  month: number;
}

// Define EmployeePayrollDetails interface
export interface EmployeePayrollDetails extends Employee {
  ssn?: string; // Add SSN field for the payroll service
  payHistory?: {
    [payPeriod: string]: PayrollCalculationResult;
  };
}
