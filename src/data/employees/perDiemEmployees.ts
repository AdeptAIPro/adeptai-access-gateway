
import { Employee } from "@/types/employee";

/**
 * Mock data for per diem employees
 */
export const perDiemEmployees: Employee[] = [
  {
    id: "emp-004",
    employeeId: "EMP004",
    name: "David Park",
    title: "Traveling Nurse",
    email: "david.park@example.com",
    phone: "(555) 456-7890",
    address: "1010 Travel Ln, Mobiletown, FL 33101",
    dateOfBirth: "1988-11-30",
    ssn: "456-78-9012",
    type: "Per Diem",
    status: "Active",
    department: "Nursing",
    payRate: "55.00",
    paySchedule: "Weekly",
    startDate: "2023-02-01",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    bankInfo: {
      bankName: "Mobile Banking Co",
      accountType: "Checking",
      routingNumber: "456789123",
      accountNumber: "567891234"
    },
    taxForms: {
      w4: {
        submitted: true,
        lastUpdated: "2023-01-25"
      },
      i9: {
        submitted: true,
        lastUpdated: "2023-01-25"
      }
    },
    taxWithholdings: {
      federalFilingStatus: "Single",
      federalAllowances: "1",
      state: "Florida",
      stateFilingStatus: "Single"
    }
  }
];
