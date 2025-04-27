import { Employee } from "@/types/employee";

export const w2Employees: Employee[] = [
  {
    id: "W2-001",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    address: {
      street: "123 Main St",
      city: "Boston",
      state: "MA",
      zipCode: "02108"
    },
    status: "active",
    employeeType: "W2",
    startDate: "2023-01-15",
    payRate: 75000,
    payType: "salary",
    bankInfo: {
      accountNumber: "****1234",
      routingNumber: "****5678",
      accountType: "checking",
      bankName: "Bank of America"
    }
  },
  {
    id: "W2-002",
    name: "Emily White",
    email: "emily.white@example.com",
    phone: "(555) 234-5678",
    address: {
      street: "456 Elm St",
      city: "Cambridge",
      state: "MA",
      zipCode: "02138"
    },
    status: "active",
    employeeType: "W2",
    startDate: "2023-02-01",
    payRate: 62000,
    payType: "salary",
    bankInfo: {
      accountNumber: "****9876",
      routingNumber: "****5432",
      accountType: "savings",
      bankName: "Citibank"
    }
  },
  {
    id: "W2-003",
    name: "David Lee",
    email: "david.lee@example.com",
    phone: "(555) 345-6789",
    address: {
      street: "789 Oak St",
      city: "New York",
      state: "NY",
      zipCode: "10001"
    },
    status: "inactive",
    employeeType: "W2",
    startDate: "2022-11-01",
    payRate: 80000,
    payType: "salary",
    bankInfo: {
      accountNumber: "****2345",
      routingNumber: "****6789",
      accountType: "checking",
      bankName: "Capital One"
    }
  },
  {
    id: "W2-004",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "(555) 456-7890",
    address: {
      street: "101 Pine St",
      city: "Seattle",
      state: "WA",
      zipCode: "98101"
    },
    status: "active",
    employeeType: "W2",
    startDate: "2023-03-15",
    payRate: 70000,
    payType: "salary",
    bankInfo: {
      accountNumber: "****8765",
      routingNumber: "****3210",
      accountType: "savings",
      bankName: "US Bank"
    }
  },
  {
    id: "W2-005",
    name: "Kevin Brown",
    email: "kevin.brown@example.com",
    phone: "(555) 567-8901",
    address: {
      street: "222 Maple St",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001"
    },
    status: "pending",
    employeeType: "W2",
    startDate: "2023-04-01",
    payRate: 65000,
    payType: "salary",
    bankInfo: {
      accountNumber: "****3456",
      routingNumber: "****7890",
      accountType: "checking",
      bankName: "Wells Fargo"
    }
  }
];
