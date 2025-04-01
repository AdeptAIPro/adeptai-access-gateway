
import { Employee } from "@/types/employee";
import { calculateTaxes } from "./tax/TaxCalculationService";
import { generatePayStub } from "./paystub/PayStubGenerator";
import { processPayment, processBulkPayments } from "./payment/PaymentProcessor";
import { fetchEmployees } from "./EmployeeService";
import { recordPayrollRun } from "./PayrollHistoryService";
import { toast } from "@/hooks/use-toast";

export interface PayrollRunOptions {
  payPeriod: string;
  payDate: string;
  employeeType?: "W-2" | "1099" | "Independent Contractor" | "Per Diem" | "All";
  departmentFilter?: string;
  payFrequency: "Weekly" | "Bi-Weekly" | "Monthly" | "Semi-Monthly";
  companyInfo?: {
    name: string;
    address: string;
    ein?: string;
  };
}

export interface PayrollRunResult {
  totalEmployees: number;
  processedEmployees: number;
  totalGrossPay: number;
  totalNetPay: number;
  totalTaxes: number;
  successfulPayments: number;
  failedPayments: number;
  payDate: string;
  processingTime: number;
  status: "Completed" | "Partial" | "Failed";
}

/**
 * Runs payroll processing for the specified pay period and employees
 */
export const runPayroll = async (options: PayrollRunOptions): Promise<PayrollRunResult> => {
  const startTime = Date.now();
  
  try {
    // 1. Fetch all employees based on filters
    let employees = await fetchEmployees();
    
    // Apply filters
    if (options.employeeType && options.employeeType !== "All") {
      employees = employees.filter(emp => emp.type === options.employeeType);
    }
    
    if (options.departmentFilter) {
      employees = employees.filter(emp => emp.department === options.departmentFilter);
    }
    
    // 2. Process each employee
    const result: PayrollRunResult = {
      totalEmployees: employees.length,
      processedEmployees: 0,
      totalGrossPay: 0,
      totalNetPay: 0,
      totalTaxes: 0,
      successfulPayments: 0,
      failedPayments: 0,
      payDate: options.payDate,
      processingTime: 0,
      status: "Failed"
    };
    
    // Prepare batch processing data
    const paymentBatch = [];
    
    // Process each eligible employee
    for (const employee of employees) {
      try {
        // Parse employee pay rate
        const payRate = parseFloat(employee.payRate);
        if (isNaN(payRate)) continue;
        
        // Calculate gross pay based on pay frequency
        let hoursPerPeriod = 0;
        switch (options.payFrequency) {
          case "Weekly":
            hoursPerPeriod = 40;
            break;
          case "Bi-Weekly":
            hoursPerPeriod = 80;
            break;
          case "Semi-Monthly":
            hoursPerPeriod = 86.67;
            break;
          case "Monthly":
            hoursPerPeriod = 173.33;
            break;
        }
        
        // For salaried employees, we would use a different calculation
        // This simple example assumes hourly employees
        const grossPay = payRate * hoursPerPeriod;
        
        // Calculate taxes
        const taxResult = calculateTaxes(
          employee, 
          grossPay,
          options.payFrequency
        );
        
        // Generate pay stub
        const payStub = await generatePayStub(
          employee,
          options.payPeriod,
          options.payDate,
          taxResult,
          options.companyInfo
        );
        
        if (payStub) {
          // Add to batch for payment processing
          paymentBatch.push({
            employee,
            payStub
          });
          
          // Update running totals
          result.totalGrossPay += grossPay;
          result.totalNetPay += taxResult.netPay;
          result.totalTaxes += taxResult.totalTaxes;
          result.processedEmployees++;
        }
      } catch (employeeError) {
        console.error(`Error processing employee ${employee.id}:`, employeeError);
      }
    }
    
    // 3. Process payments in bulk
    if (paymentBatch.length > 0) {
      const paymentResults = await processBulkPayments(paymentBatch);
      result.successfulPayments = paymentResults.successful;
      result.failedPayments = paymentResults.failed;
    }
    
    // 4. Record the payroll run
    const endTime = Date.now();
    result.processingTime = (endTime - startTime) / 1000; // Convert to seconds
    
    // Determine overall status
    if (result.processedEmployees === 0) {
      result.status = "Failed";
    } else if (result.failedPayments > 0) {
      result.status = "Partial";
    } else {
      result.status = "Completed";
    }
    
    // Record payroll run in history
    await recordPayrollRun({
      runDate: new Date().toISOString(),
      payPeriod: options.payPeriod,
      totalAmount: result.totalGrossPay,
      totalEmployees: result.processedEmployees,
      status: result.status === "Failed" ? "Failed" : (result.status === "Partial" ? "Processing" : "Complete")
    });
    
    // Show summary toast
    toast({
      title: `Payroll Run ${result.status}`,
      description: `Processed ${result.processedEmployees} employees with ${result.successfulPayments} successful payments.`,
      variant: result.status === "Failed" ? "destructive" : (result.status === "Partial" ? "default" : "default"),
    });
    
    return result;
  } catch (error) {
    console.error("Error running payroll:", error);
    toast({
      title: "Payroll Processing Failed",
      description: "There was an error running payroll. Please try again.",
      variant: "destructive",
    });
    
    return {
      totalEmployees: 0,
      processedEmployees: 0,
      totalGrossPay: 0,
      totalNetPay: 0,
      totalTaxes: 0,
      successfulPayments: 0,
      failedPayments: 0,
      payDate: options.payDate,
      processingTime: (Date.now() - startTime) / 1000,
      status: "Failed"
    };
  }
};
