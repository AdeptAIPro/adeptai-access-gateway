
import { supabase } from "@/lib/supabase";
import { Employee } from "@/hooks/use-payroll";
import { toast } from "@/hooks/use-toast";

// Sample employees data that will be used to seed the database
const sampleEmployees: Omit<Employee, "id">[] = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
    employeeId: "EMP005",
    name: "Emma Rodriguez",
    title: "Human Resources Manager",
    email: "emma.rodriguez@example.com",
    phone: "(555) 567-8901",
    address: "222 HR Avenue, Staffville, CA 92008",
    dateOfBirth: "1979-08-05",
    ssn: "567-89-0123",
    type: "W-2",
    status: "Active",
    department: "Human Resources",
    payRate: "52.00",
    paySchedule: "Bi-Weekly",
    startDate: "2020-06-15",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    emergencyContact: {
      name: "Carlos Rodriguez",
      phone: "(555) 234-5678",
      relationship: "Spouse"
    },
    bankInfo: {
      bankName: "People's Credit Union",
      accountType: "Checking",
      routingNumber: "567891234",
      accountNumber: "012345678"
    },
    taxForms: {
      w4: {
        submitted: true,
        lastUpdated: "2020-06-10"
      },
      i9: {
        submitted: true,
        lastUpdated: "2020-06-10"
      },
      w2: {
        available: true,
        year: "2023"
      }
    },
    taxWithholdings: {
      federalFilingStatus: "Married Filing Jointly",
      federalAllowances: "3",
      state: "California",
      stateFilingStatus: "Married Filing Jointly"
    },
    recentPayslips: [
      {
        payPeriod: "Jun 1 - Jun 15, 2023",
        payDate: "Jun 20, 2023",
        grossPay: "4,160.00",
        netPay: "3,120.00",
        id: "pay-20230620-3"
      }
    ]
  },
  {
    employeeId: "EMP006",
    name: "James Wilson",
    title: "Marketing Specialist",
    email: "james.wilson@example.com",
    phone: "(555) 678-9012",
    address: "333 Brand St, Marketing City, CA 91010",
    dateOfBirth: "1992-11-18",
    ssn: "678-90-1234",
    type: "W-2",
    status: "On Leave",
    department: "Marketing",
    payRate: "48.50",
    paySchedule: "Bi-Weekly",
    startDate: "2021-03-01",
    avatar: "https://randomuser.me/api/portraits/men/42.jpg",
    bankInfo: {
      bankName: "Marketing Credit Union",
      accountType: "Savings",
      routingNumber: "678912345",
      accountNumber: "123456780"
    },
    taxForms: {
      w4: {
        submitted: true,
        lastUpdated: "2021-02-25"
      },
      i9: {
        submitted: true,
        lastUpdated: "2021-02-25"
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
    }
  }
];

/**
 * Seeds the Supabase database with sample employee data
 */
export const seedEmployeeData = async (): Promise<boolean> => {
  try {
    // Check if employees table already has data
    const { data: existingEmployees, error: checkError } = await supabase
      .from("employees")
      .select("id")
      .limit(1);
      
    if (checkError) {
      throw checkError;
    }
    
    // If there are already employees, don't seed more
    if (existingEmployees && existingEmployees.length > 0) {
      console.log("Employees table already has data, skipping seed");
      return false;
    }
    
    // Insert sample employees
    const { error: insertError } = await supabase
      .from("employees")
      .insert(sampleEmployees);
      
    if (insertError) {
      throw insertError;
    }
    
    toast({
      title: "Database Seeded",
      description: "Sample employee data has been added to your database.",
    });
    
    return true;
  } catch (error) {
    console.error("Error seeding employee data:", error);
    toast({
      title: "Seeding Error",
      description: "Could not add sample employees to your database. Using mock data instead.",
      variant: "destructive",
    });
    return false;
  }
};
