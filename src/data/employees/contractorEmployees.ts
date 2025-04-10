
import { Employee } from "@/types/employee";

/**
 * Mock data for 1099 contractor employees
 */
export const contractorEmployees: Employee[] = [
  {
    id: "emp-003",
    employeeId: "EMP003",
    name: "Jessica Williams",
    title: "Healthcare Consultant",
    email: "jessica.williams@example.com",
    phone: "(555) 345-6789",
    address: "789 Consulting Rd, Businesstown, NY 10001",
    dateOfBirth: "1982-04-12",
    ssn: "345-67-8901",
    type: "1099",
    status: "Active",
    department: "Healthcare",
    payRate: "85.00",
    paySchedule: "Monthly",
    startDate: "2023-01-15",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    bankInfo: {
      bankName: "Consultant Credit Union",
      accountType: "Checking",
      routingNumber: "345678912",
      accountNumber: "891234567"
    },
    taxForms: {
      i9: {
        submitted: true,
        lastUpdated: "2023-01-10"
      },
      form1099: {
        available: true,
        year: "2023"
      }
    }
  }
];
