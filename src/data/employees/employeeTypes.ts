
export type EmployeeStatus = "active" | "inactive" | "pending";

export interface EmployeeAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Employee {
  id: string;
  name: string;
  employeeId: string;
  email: string;
  type: string;
  phone?: string;
  address?: string | EmployeeAddress;
  status: EmployeeStatus;
  department?: string;
  position?: string;
  hireDate?: string;
  taxInfo?: {
    ssn: string;
    withholding: number;
    w4Status: string;
  };
}
