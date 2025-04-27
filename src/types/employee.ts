
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
  [key: string]: any;
}
