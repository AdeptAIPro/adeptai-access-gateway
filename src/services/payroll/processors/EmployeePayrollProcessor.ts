
import { Employee } from "@/types/employee";
import { calculateTaxes } from "../tax/TaxCalculationService";
import { generatePayStub } from "../paystub/PayStubGenerator";
import { calculateHoursPerPeriod } from "../utils/PayrollCalculationUtils";
import { PayrollBatchItem } from "../types/PayrollTypes";
import { toast } from "@/hooks/use-toast";

/**
 * Process payroll for a single employee
 */
export const processEmployeePayroll = async (
  employee: Employee,
  hoursPerPeriod: number,
  payPeriod: string,
  payDate: string,
  payFrequency: "Weekly" | "Bi-Weekly" | "Monthly" | "Semi-Monthly",
  companyInfo?: {
    name: string;
    address: string;
    ein?: string;
  },
  useDynamicTaxRates?: boolean
): Promise<{ 
  grossPay: number; 
  netPay: number;
  totalTaxes: number; 
  payStubItem?: PayrollBatchItem 
}> => {
  try {
    // Parse employee pay rate
    const payRate = parseFloat(employee.payRate);
    if (isNaN(payRate)) {
      return { grossPay: 0, netPay: 0, totalTaxes: 0 };
    }
    
    // For salaried employees, we would use a different calculation
    // This simple example assumes hourly employees
    const grossPay = payRate * hoursPerPeriod;
    
    // Calculate taxes
    const taxResult = await calculateTaxes(
      employee,
      grossPay,
      payFrequency
    );
    
    // Generate pay stub
    const payStub = await generatePayStub(
      employee,
      payPeriod,
      payDate,
      taxResult,
      companyInfo
    );
    
    if (payStub) {
      return {
        grossPay,
        netPay: taxResult.netPay,
        totalTaxes: taxResult.totalTaxes,
        payStubItem: {
          employee,
          payStub
        }
      };
    }
    
    return { 
      grossPay, 
      netPay: taxResult.netPay, 
      totalTaxes: taxResult.totalTaxes 
    };
  } catch (error) {
    console.error(`Error processing employee ${employee.id}:`, error);
    return { grossPay: 0, netPay: 0, totalTaxes: 0 };
  }
};
