
import { Employee } from "@/types/employee";

/**
 * Mock data for W-2 employees
 */
export const w2Employees: Employee[] = [
  {
    id: "emp-001",
    employeeId: "EMP001",
    name: "Sarah Johnson",
    title: "Registered Nurse",
    email: "sarah.johnson@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, CA 90210",
    dateOfBirth: "1985-06-15",
    ssn: "123-45-6789",
    type: "W-2",
    status: "Active",
    department: "Nursing",
    payRate: "45.00",
    paySchedule: "Bi-Weekly",
    startDate: "2022-03-15",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    emergencyContact: {
      name: "John Johnson",
      phone: "(555) 987-6543",
      relationship: "Spouse"
    },
    bankInfo: {
      bankName: "First National Bank",
      accountType: "Checking",
      routingNumber: "123456789",
      accountNumber: "987654321"
    },
    taxForms: {
      w4: {
        submitted: true,
        lastUpdated: "2022-03-10"
      },
      i9: {
        submitted: true,
        lastUpdated: "2022-03-10"
      },
      w2: {
        available: true,
        year: "2023"
      }
    },
    taxWithholdings: {
      federalFilingStatus: "Married Filing Jointly",
      federalAllowances: "2",
      state: "California",
      stateFilingStatus: "Married Filing Jointly"
    },
    recentPayslips: [
      {
        payPeriod: "Jun 1 - Jun 15, 2023",
        payDate: "Jun 20, 2023",
        grossPay: "3,600.00",
        netPay: "2,748.50",
        id: "pay-20230620"
      },
      {
        payPeriod: "May 16 - May 31, 2023",
        payDate: "Jun 5, 2023",
        grossPay: "3,600.00",
        netPay: "2,748.50",
        id: "pay-20230605"
      }
    ]
  },
  {
    id: "emp-002",
    employeeId: "EMP002",
    name: "Michael Chen",
    title: "Software Developer",
    email: "michael.chen@example.com",
    phone: "(555) 234-5678",
    address: "456 Tech Ave, Silicon Valley, CA 94024",
    dateOfBirth: "1990-09-22",
    ssn: "234-56-7890",
    type: "W-2",
    status: "Active",
    department: "IT",
    payRate: "60.00",
    paySchedule: "Bi-Weekly",
    startDate: "2021-11-01",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    emergencyContact: {
      name: "Lin Chen",
      phone: "(555) 876-5432",
      relationship: "Parent"
    },
    bankInfo: {
      bankName: "Tech Credit Union",
      accountType: "Checking",
      routingNumber: "987654321",
      accountNumber: "123456789"
    },
    paymentDistribution: [
      {
        bankName: "Tech Credit Union",
        accountType: "Checking",
        routingNumber: "987654321",
        accountNumber: "123456789",
        percentage: 80,
        type: "Primary"
      },
      {
        bankName: "Investment Bank",
        accountType: "Savings",
        routingNumber: "567891234",
        accountNumber: "987123456",
        percentage: 20,
        type: "Secondary"
      }
    ],
    taxForms: {
      w4: {
        submitted: true,
        lastUpdated: "2021-10-25"
      },
      i9: {
        submitted: true,
        lastUpdated: "2021-10-25"
      },
      w2: {
        available: true,
        year: "2023"
      }
    },
    taxWithholdings: {
      federalFilingStatus: "Single",
      federalAllowances: "1",
      state: "California",
      stateFilingStatus: "Single"
    },
    recentPayslips: [
      {
        payPeriod: "Jun 1 - Jun 15, 2023",
        payDate: "Jun 20, 2023",
        grossPay: "4,800.00",
        netPay: "3,552.00",
        id: "pay-20230620-2"
      },
      {
        payPeriod: "May 16 - May 31, 2023",
        payDate: "Jun 5, 2023",
        grossPay: "4,800.00",
        netPay: "3,552.00",
        id: "pay-20230605-2"
      }
    ]
  }
];
