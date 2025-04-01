
// PayrollRunOptions defines the configuration for running payroll
export type PayrollRunOptions = {
  payPeriod: string;
  payDate: string;
  payFrequency: "Weekly" | "Bi-Weekly" | "Monthly" | "Semi-Monthly";
  employeeType?: "W-2" | "1099" | "All";
  departmentFilter?: string;
  useDynamicTaxRates?: boolean;
  country?: string; // Added country parameter
  individualEmployeeId?: string; // Added individualEmployeeId parameter
  companyInfo?: {
    name: string;
    address: string;
    ein?: string;
  };
};

// PayrollRunResult contains the results of a payroll run
export type PayrollRunResult = {
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
};

// PayrollBatchItem represents a single payment in a batch
export type PayrollBatchItem = {
  employee: any;
  payStub: any;
};
