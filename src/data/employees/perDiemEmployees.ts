import { Employee } from "@/types/employee";

export const perDiemEmployees: Employee[] = [
  {
    id: "PD-001",
    name: "Sarah Wilson",
    email: "sarah.w@perdiem.com",
    phone: "(555) 234-5678",
    address: {
      street: "789 Healthcare Ave",
      city: "Chicago",
      state: "IL",
      zipCode: "60601"
    },
    status: "active",
    employeeType: "perDiem",
    startDate: "2023-06-01",
    payRate: 45,
    payType: "hourly",
    bankInfo: {
      accountNumber: "****5678",
      routingNumber: "****4321",
      accountType: "checking",
      bankName: "Wells Fargo"
    }
  },
  {
    id: "PD-002",
    name: "Kevin Brown",
    email: "kevin.b@perdiem.com",
    phone: "(555) 345-6789",
    address: {
      street: "321 Nursing Home Rd",
      city: "Miami",
      state: "FL",
      zipCode: "33101"
    },
    status: "active",
    employeeType: "perDiem",
    startDate: "2023-07-15",
    payRate: 50,
    payType: "hourly",
    bankInfo: {
      accountNumber: "****8765",
      routingNumber: "****1234",
      accountType: "checking",
      bankName: "Citibank"
    }
  },
  {
    id: "PD-003",
    name: "Emily Davis",
    email: "emily.d@perdiem.com",
    phone: "(555) 456-7890",
    address: {
      street: "654 Assisted Living Dr",
      city: "Dallas",
      state: "TX",
      zipCode: "75201"
    },
    status: "inactive",
    employeeType: "perDiem",
    startDate: "2023-08-01",
    payRate: 55,
    payType: "hourly",
    bankInfo: {
      accountNumber: "****2345",
      routingNumber: "****5678",
      accountType: "checking",
      bankName: "Capital One"
    }
  }
];
