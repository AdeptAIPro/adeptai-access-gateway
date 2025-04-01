
/**
 * Employee type definitions
 */
export interface Employee {
  id: string;
  employeeId: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  ssn: string;
  type: "W-2" | "1099" | "Independent Contractor" | "Per Diem";
  status: "Active" | "Inactive" | "On Leave";
  department: string;
  payRate: string;
  paySchedule: string;
  startDate: string;
  avatar?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  bankInfo?: {
    bankName: string;
    accountType: string;
    routingNumber: string;
    accountNumber: string;
  };
  paymentDistribution?: Array<{
    bankName: string;
    accountType: string;
    routingNumber: string;
    accountNumber: string;
    percentage: number;
    type: "Primary" | "Secondary";
  }>;
  taxForms?: {
    w4?: {
      submitted: boolean;
      lastUpdated?: string;
    };
    i9?: {
      submitted: boolean;
      lastUpdated?: string;
    };
    w2?: {
      available: boolean;
      year?: string;
    };
    form1099?: {
      available: boolean;
      year?: string;
    };
  };
  taxWithholdings?: {
    federalFilingStatus: string;
    federalAllowances: string;
    state: string;
    stateFilingStatus: string;
  };
  recentPayslips?: Array<{
    payPeriod: string;
    payDate: string;
    grossPay: string;
    netPay: string;
    id: string;
  }>;
}
