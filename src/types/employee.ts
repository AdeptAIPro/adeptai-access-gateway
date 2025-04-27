
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface BankInfo {
  accountNumber: string;
  routingNumber: string;
  accountType: string;
  bankName: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: Address;
  status: "active" | "inactive" | "pending";
  employeeType: "W2" | "contractor" | "perDiem";
  startDate: string;
  bankInfo?: BankInfo;
  taxInfo?: {
    ssn: string;
    withholdings: number;
    filingStatus: string;
  };
  payRate: number;
  payType: "hourly" | "salary";
}
