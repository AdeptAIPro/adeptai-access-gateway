
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
  // Add missing properties
  individualEmployeeId?: string;
  employeeType?: string;
  departmentFilter?: string;
  payPeriod?: string;
  payDate?: string;
  country?: string;
  useDynamicTaxRates?: boolean;
  companyInfo?: {
    name: string;
    address: string;
    ein?: string;
  };
  verifyCompliance?: boolean;
  optimizeForTaxes?: boolean;
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
  // Add missing properties
  totalEmployees: number;
  processedEmployees: number;
  totalGrossPay: number;
  totalNetPay: number;
  totalTaxes: number;
  successfulPayments: number;
  failedPayments: number;
  processingTime: number;
  taxRateSource?: string;
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

// Define PayrollBatchItem interface
export interface PayrollBatchItem {
  employeeId: string;
  amount: number;
  paymentMethod: string;
  bankInfo?: {
    accountNumber: string;
    routingNumber: string;
    accountType: string;
  };
  taxInfo?: any;
  deductions?: any;
}
