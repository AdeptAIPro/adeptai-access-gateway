
/**
 * Types for payroll processing
 */

export interface PayrollRunOptions {
  payPeriod: string;
  payDate: string;
  employeeType?: "W-2" | "1099" | "Independent Contractor" | "Per Diem" | "All";
  departmentFilter?: string;
  payFrequency: "Weekly" | "Bi-Weekly" | "Monthly" | "Semi-Monthly";
  companyInfo?: {
    name: string;
    address: string;
    ein?: string;
  };
  useDynamicTaxRates?: boolean;
}

export interface PayrollRunResult {
  totalEmployees: number;
  processedEmployees: number;
  totalGrossPay: number;
  totalNetPay: number;
  totalTaxes: number;
  successfulPayments: number;
  failedPayments: number;
  payDate: string;
  processingTime: number;
  status: "Completed" | "Partial" | "Failed";
  taxRateSource?: "API" | "Static";
}

export interface PayrollBatchItem {
  employee: any;
  payStub: any;
}
