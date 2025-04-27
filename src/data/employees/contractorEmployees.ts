import { Employee } from "@/types/employee";

export const contractorEmployees: Employee[] = [
  {
    id: "C-001",
    name: "Alice Johnson",
    email: "alice.j@contractor.com",
    phone: "(555) 987-6543",
    address: {
      street: "456 Tech Lane",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105"
    },
    status: "active",
    employeeType: "contractor",
    startDate: "2023-03-01",
    payRate: 85,
    payType: "hourly",
    bankInfo: {
      accountNumber: "****4321",
      routingNumber: "****8765",
      accountType: "checking",
      bankName: "Chase"
    }
  },
  {
    id: "C-002",
    name: "Bob Williams",
    email: "bob.w@contractor.com",
    phone: "(555) 345-6789",
    address: {
      street: "789 Digital Rd",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001"
    },
    status: "active",
    employeeType: "contractor",
    startDate: "2023-04-15",
    payRate: 95,
    payType: "hourly",
    bankInfo: {
      accountNumber: "****9876",
      routingNumber: "****2345",
      accountType: "checking",
      bankName: "Wells Fargo"
    }
  },
  {
    id: "C-003",
    name: "Catherine Brown",
    email: "catherine.b@contractor.com",
    phone: "(555) 456-7890",
    address: {
      street: "101 Innovation Plaza",
      city: "Seattle",
      state: "WA",
      zipCode: "98101"
    },
    status: "inactive",
    employeeType: "contractor",
    startDate: "2022-11-01",
    payRate: 110,
    payType: "hourly",
    bankInfo: {
      accountNumber: "****3456",
      routingNumber: "****7890",
      accountType: "checking",
      bankName: "Citibank"
    }
  }
];
