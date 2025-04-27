
import { Employee, PaymentDistribution, PreTaxDeduction, PostTaxDeduction, TimeTracking } from "@/types/employee";

/**
 * Options for running payroll
 */
export interface PayrollRunOptions {
  payPeriod: string;
  payDate: string;
  payFrequency: "Weekly" | "Bi-Weekly" | "Monthly" | "Semi-Monthly";
  employeeType?: "W-2" | "1099" | "All";
  departmentFilter?: string;
  country?: string;
  individualEmployeeId?: string;
  useDynamicTaxRates?: boolean;
  companyInfo?: {
    name: string;
    address: string;
    ein?: string;
  };
  optimizeForTaxes?: boolean;
  verifyCompliance?: boolean;
}

/**
 * Results from a payroll run
 */
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

/**
 * Pay stub line item
 */
export interface PayStubItem {
  name: string;
  amount: number;
  type: "earning" | "deduction" | "tax" | "reimbursement";
  ytd?: number;
}

/**
 * Complete pay stub
 */
export interface PayStub {
  employeeId: string;
  employeeName: string;
  payPeriod: string;
  payDate: string;
  grossPay: number;
  netPay: number;
  items: PayStubItem[];
  employer: {
    name: string;
    address: string;
    ein?: string;
  };
  paymentMethod: "direct_deposit" | "check" | "cash";
  paymentDetails?: {
    accountLast4?: string;
    checkNumber?: string;
  };
  ytdGross?: number;
  ytdNet?: number;
  ytdTaxes?: number;
  message?: string;
}

/**
 * Item in a payroll batch for processing
 */
export interface PayrollBatchItem {
  employee: Employee;
  payStub: PayStub;
  payments?: PaymentDistribution[];
  directDepositInfo?: {
    bankName: string;
    accountLast4: string;
    routingNumber: string;
    accountType: string;
  };
}

/**
 * Payroll tax rates configuration
 */
export interface TaxRatesConfig {
  federal: {
    incomeTax: number; // Percentage
    socialSecurity: number;
    medicare: number;
    additionalMedicare?: number;
    federalUnemployment?: number;
  };
  state?: {
    incomeTax?: number; // Percentage
    disability?: number;
    unemployment?: number;
    other?: {
      name: string;
      rate: number;
    }[];
  };
  local?: {
    incomeTax?: number;
    other?: {
      name: string;
      rate: number;
    }[];
  };
  effectiveDate: string;
  expirationDate?: string;
}

/**
 * Employee payroll preferences
 */
export interface EmployeePayrollPreferences {
  paymentMethod: "direct_deposit" | "check";
  payStubDelivery: "email" | "mail" | "online";
  taxWithholding: {
    federal: {
      filingStatus: string;
      allowances: number;
      additionalWithholding?: number;
    };
    state?: {
      filingStatus: string;
      allowances?: number;
      additionalWithholding?: number;
    };
  };
  preTaxDeductions?: PreTaxDeduction[];
  postTaxDeductions?: PostTaxDeduction[];
  directDeposit?: PaymentDistribution[];
}

/**
 * History record for a payroll run
 */
export interface PayrollHistoryRecord {
  id: string;
  runDate: string;
  payPeriod: string;
  processedBy: string;
  totalAmount: number;
  totalEmployees: number;
  status: "Complete" | "Processing" | "Failed";
  notes?: string;
  fileUrl?: string;
}

/**
 * Compliance record for tax filings
 */
export interface TaxFilingRecord {
  id: string;
  filingType: "941" | "940" | "W2" | "1099" | "state" | "local" | "other";
  period: string; // "2023-Q1", "2023", etc.
  dueDate: string;
  filedDate?: string;
  status: "pending" | "filed" | "extended" | "late";
  amount: number;
  confirmationNumber?: string;
  fileUrl?: string;
  notes?: string;
}

/**
 * Audit trail entry for payroll actions
 */
export interface PayrollAuditEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  entityType: "payroll" | "employee" | "tax" | "payment" | "setting";
  entityId?: string;
  before?: any;
  after?: any;
  ipAddress?: string;
  notes?: string;
}
