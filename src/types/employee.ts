
export interface TaxWithholding {
  federalFilingStatus: 'Single' | 'Married Filing Jointly' | 'Married Filing Separately' | 'Head of Household';
  federalAllowances: number;
  additionalFederalWithholding?: number;
  state?: string;
  stateFilingStatus?: string;
  stateAllowances?: number;
  additionalStateWithholding?: number;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  accountType: 'checking' | 'savings';
  accountHolderName?: string;
}

export interface PaymentDistribution {
  bankAccount: BankAccount;
  amount?: number; // Fixed amount
  percentage?: number; // Or percentage of net pay
  primary: boolean;
}

export interface PreTaxDeduction {
  id: string;
  name: string;
  type: '401k' | 'HSA' | 'FSA' | 'other';
  amount?: number; // Fixed amount
  percentage?: number; // Or percentage of gross pay
  limit?: {
    annual: number;
    remaining: number;
  };
  employerMatch?: {
    percentage: number;
    upTo: number;
  };
}

export interface PostTaxDeduction {
  id: string;
  name: string;
  type: 'health' | 'dental' | 'vision' | 'retirement' | 'garnishment' | 'other';
  amount?: number; // Fixed amount
  percentage?: number; // Or percentage of gross pay
}

export interface TimeTracking {
  regularHours: number;
  overtimeHours: number;
  doubleTimeHours?: number;
  paidTimeOff?: number;
  sickTime?: number;
  holidayHours?: number;
  otherPaidHours?: {
    type: string;
    hours: number;
  }[];
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  position: string;
  department: string;
  startDate: string;
  salary?: number;
  hourlyRate?: number;
  status: 'active' | 'inactive' | 'pending';
  employmentType: 'full-time' | 'part-time' | 'contract' | 'per-diem';
  payrollType: 'W2' | '1099';
  bankAccount?: {
    accountNumber: string;
    routingNumber: string;
    accountType: 'checking' | 'savings';
  };
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  taxInfo?: {
    ssn: string;
    federalFilingStatus: string;
    federalExemptions: number;
    stateFilingStatus: string;
    stateExemptions: number;
  };
  
  // Enhanced fields for complete payroll processing
  payRate: string; // As string to handle currency formatting
  paySchedule?: 'Weekly' | 'Bi-Weekly' | 'Semi-Monthly' | 'Monthly';
  taxWithholdings?: TaxWithholding;
  paymentAccounts?: PaymentDistribution[];
  preTaxDeductions?: PreTaxDeduction[];
  postTaxDeductions?: PostTaxDeduction[];
  timeTracking?: TimeTracking;
  ytdEarnings?: {
    regular: number;
    overtime: number;
    bonus: number;
    commission: number;
    other: number;
    total: number;
  };
  ytdTaxes?: {
    federal: number;
    state: number;
    fica: number;
    medicare: number;
    other: number;
    total: number;
  };
  
  [key: string]: any;
}
