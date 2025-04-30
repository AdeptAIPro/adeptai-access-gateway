
export interface Employee {
  id: string;
  name: string;
  employeeId: string;
  email: string;
  type: string;
  phone?: string;
  address?: string | {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  status: "active" | "inactive" | "pending";
  department?: string;
  position?: string;
  hireDate?: string;
  taxInfo?: {
    ssn: string;
    withholding: number;
    w4Status: string;
  };
}
