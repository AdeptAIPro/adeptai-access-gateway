
import { Employee } from "@/types/employee";
import { DeductionDetail, PayrollTaxResult } from "../tax/TaxCalculationService";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

export interface PayStub {
  id: string;
  employeeId: string;
  payPeriod: string;
  payDate: string;
  grossPay: number;
  netPay: number;
  taxableIncome: number;
  deductions: DeductionDetail[];
  ytdGrossPay?: number;
  ytdNetPay?: number;
  ytdTaxes?: number;
  company?: {
    name: string;
    address: string;
    ein?: string;
  };
  createdAt: string;
}

export const PAYSTUBS_TABLE = "paystubs";

/**
 * Generates a pay stub for an employee
 */
export const generatePayStub = async (
  employee: Employee,
  payPeriod: string,
  payDate: string,
  taxResult: PayrollTaxResult,
  companyInfo?: { name: string; address: string; ein?: string }
): Promise<PayStub | null> => {
  try {
    // Create the pay stub object
    const payStub: Omit<PayStub, "id"> = {
      employeeId: employee.id,
      payPeriod,
      payDate,
      grossPay: taxResult.grossPay,
      netPay: taxResult.netPay,
      taxableIncome: taxResult.taxableIncome,
      deductions: taxResult.deductions,
      company: companyInfo,
      createdAt: new Date().toISOString(),
    };

    // Try to get YTD information
    const { data: ytdData, error: ytdError } = await supabase
      .from(PAYSTUBS_TABLE)
      .select("grossPay,netPay")
      .eq("employeeId", employee.id)
      .gte("payDate", new Date().getFullYear() + "-01-01")
      .lt("payDate", payDate);

    if (!ytdError && ytdData) {
      // Calculate YTD totals
      let ytdGrossPay = taxResult.grossPay;
      let ytdNetPay = taxResult.netPay;
      let ytdTaxes = taxResult.totalTaxes;
      
      ytdData.forEach(paystub => {
        ytdGrossPay += paystub.grossPay;
        ytdNetPay += paystub.netPay;
      });
      
      Object.assign(payStub, { ytdGrossPay, ytdNetPay, ytdTaxes });
    }

    // Store the pay stub in the database
    const { data, error } = await supabase
      .from(PAYSTUBS_TABLE)
      .insert([payStub])
      .select()
      .single();

    if (error) {
      console.error("Error storing pay stub:", error);
      throw error;
    }

    // Add the new pay stub to the employee's recent payslips
    if (employee.recentPayslips) {
      const newPayslip = {
        payPeriod,
        payDate,
        grossPay: taxResult.grossPay.toFixed(2),
        netPay: taxResult.netPay.toFixed(2),
        id: data.id
      };

      await supabase
        .from("employees")
        .update({
          recentPayslips: [newPayslip, ...(employee.recentPayslips.slice(0, 4))]
        })
        .eq("id", employee.id);
    }

    return data as PayStub;
  } catch (error) {
    console.error("Error generating pay stub:", error);
    toast({
      title: "Error",
      description: "Failed to generate pay stub. Please try again.",
      variant: "destructive",
    });
    return null;
  }
};

/**
 * Fetches a pay stub by ID
 */
export const getPayStubById = async (payStubId: string): Promise<PayStub | null> => {
  try {
    const { data, error } = await supabase
      .from(PAYSTUBS_TABLE)
      .select("*")
      .eq("id", payStubId)
      .single();

    if (error) {
      console.error("Error fetching pay stub:", error);
      return null;
    }

    return data as PayStub;
  } catch (error) {
    console.error("Error fetching pay stub:", error);
    return null;
  }
};

/**
 * Gets all pay stubs for an employee
 */
export const getEmployeePayStubs = async (employeeId: string): Promise<PayStub[]> => {
  try {
    const { data, error } = await supabase
      .from(PAYSTUBS_TABLE)
      .select("*")
      .eq("employeeId", employeeId)
      .order("payDate", { ascending: false });

    if (error) {
      console.error("Error fetching employee pay stubs:", error);
      return [];
    }

    return data as PayStub[];
  } catch (error) {
    console.error("Error fetching employee pay stubs:", error);
    return [];
  }
};

/**
 * Generates a downloadable PDF pay stub (would integrate with PDF generation library)
 */
export const generatePayStubPDF = async (payStubId: string): Promise<string | null> => {
  try {
    // In a real implementation, this would generate a PDF using a library
    // For now, we'll just return a mock URL
    const payStub = await getPayStubById(payStubId);
    if (!payStub) return null;
    
    // Mock PDF generation
    console.log(`Generating PDF for pay stub ${payStubId}`);
    toast({
      title: "PDF Generation",
      description: "Pay stub PDF has been generated and is ready for download.",
    });
    
    return `https://example.com/paystubs/${payStubId}.pdf`;
  } catch (error) {
    console.error("Error generating pay stub PDF:", error);
    toast({
      title: "Error",
      description: "Failed to generate pay stub PDF. Please try again.",
      variant: "destructive",
    });
    return null;
  }
};
