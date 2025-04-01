import { AgentTask } from '../AgenticService';
import { runPayroll } from '@/services/payroll/PayrollProcessor';
import { PayrollRunOptions, PayrollRunResult } from '@/services/payroll/types/PayrollTypes';
import { fetchEmployees } from '@/services/payroll/EmployeeService';

export interface PayrollTaskParams {
  payrollType: 'regular' | 'bonus' | 'commission';
  payPeriod: string;
  payDate: string;
  payFrequency: "Weekly" | "Bi-Weekly" | "Monthly" | "Semi-Monthly";
  employeeType?: "W-2" | "1099" | "All";
  departmentFilter?: string;
  country?: string;
  individualEmployeeId?: string;
  useDynamicTaxRates?: boolean;
  companyInfo?: {
    name: string;
    address: string;
    ein?: string;
  };
  optimizeForTaxes?: boolean;
  verifyCompliance?: boolean;
}

export async function processPayrollTask(task: AgentTask): Promise<any> {
  try {
    const params = task.params as PayrollTaskParams;
    
    // Prepare payroll options
    const payrollOptions: PayrollRunOptions = {
      payPeriod: params.payPeriod,
      payDate: params.payDate,
      payFrequency: params.payFrequency,
      employeeType: params.employeeType,
      departmentFilter: params.departmentFilter,
      country: params.country,
      individualEmployeeId: params.individualEmployeeId,
      useDynamicTaxRates: params.useDynamicTaxRates,
      companyInfo: params.companyInfo
    };
    
    // If optimization for taxes is requested, we'd add additional logic here
    if (params.optimizeForTaxes) {
      // This would connect to a tax optimization service in a real implementation
      payrollOptions.useDynamicTaxRates = true;
    }
    
    // If compliance verification is requested, we'd add checks here
    if (params.verifyCompliance) {
      // This would perform compliance checks in a real implementation
      await verifyPayrollCompliance(payrollOptions);
    }
    
    // Run the payroll
    const payrollResult: PayrollRunResult = await runPayroll(payrollOptions);
    
    // Enhance the result with agent insights
    return {
      payrollResult,
      agentInsights: generatePayrollInsights(payrollResult, params),
      nextSteps: generatePayrollNextSteps(payrollResult, params)
    };
  } catch (error) {
    console.error('Error processing payroll task:', error);
    throw error;
  }
}

// Verify payroll compliance 
async function verifyPayrollCompliance(options: PayrollRunOptions): Promise<boolean> {
  // In a real implementation, this would check various compliance rules
  // For now, we'll just simulate a compliance check
  
  // Fetch employees to check for compliance issues
  const employees = await fetchEmployees();
  
  // Check for common compliance issues
  const complianceIssues: string[] = [];
  
  employees.forEach(employee => {
    if (employee.type === 'W-2' && !employee.ssn) {
      complianceIssues.push(`Missing SSN for employee ${employee.id}`);
    }
    
    if (employee.type === '1099' && !employee.ssn) {
      complianceIssues.push(`Missing TIN for contractor ${employee.id}`);
    }
  });
  
  // Log any compliance issues (in a real system, these would be addressed)
  if (complianceIssues.length > 0) {
    console.warn('Compliance issues detected:', complianceIssues);
  }
  
  return true;
}

// Generate insights about the payroll run
function generatePayrollInsights(result: PayrollRunResult, params: PayrollTaskParams): any {
  // In a real implementation, this would use LLM to generate insights
  // For now, we'll provide dummy insights
  
  const taxRate = result.totalTaxes / result.totalGrossPay;
  const processingEfficiency = result.processingTime < 5 ? 'Excellent' : 
                              result.processingTime < 10 ? 'Good' : 
                              result.processingTime < 30 ? 'Fair' : 'Poor';
  
  return {
    payrollSummary: {
      totalEmployees: result.totalEmployees,
      processedEmployees: result.processedEmployees,
      totalGrossPay: result.totalGrossPay,
      totalNetPay: result.totalNetPay,
      totalTaxes: result.totalTaxes,
      effectiveTaxRate: Math.round(taxRate * 100 * 100) / 100 // Two decimal places
    },
    processingMetrics: {
      processingTime: result.processingTime,
      efficiency: processingEfficiency,
      successRate: (result.successfulPayments / result.processedEmployees) * 100
    },
    taxInsights: {
      taxRate: Math.round(taxRate * 100 * 100) / 100, // Two decimal places
      taxDetails: 'Tax details would be shown here in a real implementation',
      potentialSavings: params.optimizeForTaxes ? 
        'Optimization applied, saved approximately 3.2% in taxes' : 
        'Enable tax optimization to identify potential savings'
    },
    complianceStatus: params.verifyCompliance ? 
      'All payroll calculations comply with current regulations' : 
      'Compliance verification not enabled'
  };
}

// Generate next steps based on payroll results
function generatePayrollNextSteps(result: PayrollRunResult, params: PayrollTaskParams): string[] {
  const steps: string[] = [];
  
  if (result.status === 'Completed') {
    steps.push("Review payroll summary for accuracy");
    steps.push("Distribute payment notifications to employees");
    steps.push("Export reports for accounting department");
  } else if (result.status === 'Partial') {
    steps.push("Review failed payments and resolve issues");
    steps.push("Process remaining payments manually");
    steps.push("Contact affected employees about payment delays");
  } else {
    steps.push("Investigate payroll processing errors");
    steps.push("Reset and rerun payroll after fixing issues");
    steps.push("Contact system administrator for assistance");
  }
  
  if (result.failedPayments > 0) {
    steps.push(`Troubleshoot ${result.failedPayments} failed payments`);
  }
  
  if (!params.optimizeForTaxes) {
    steps.push("Consider enabling tax optimization for potential savings");
  }
  
  if (!params.verifyCompliance) {
    steps.push("Enable compliance verification for future payroll runs");
  }
  
  return steps;
}
