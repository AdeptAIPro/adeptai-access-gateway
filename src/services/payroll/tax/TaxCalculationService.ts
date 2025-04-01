
import { Employee } from "@/types/employee";
import { toast } from "@/hooks/use-toast";

export type TaxRules = {
  country: string;
  state?: string;
  federalTaxRate: number;
  stateTaxRate: number;
  medicareRate: number;
  socialSecurityRate: number;
  additionalTaxes?: Array<{
    name: string;
    rate: number;
    maxAmount?: number;
  }>;
};

export type DeductionDetail = {
  name: string;
  amount: number;
  rate?: number;
};

export type PayrollTaxResult = {
  grossPay: number;
  netPay: number;
  deductions: DeductionDetail[];
  taxableIncome: number;
  totalTaxes: number;
};

// For demonstration, these are simplified tax rules
const USA_TAX_RULES: Record<string, TaxRules> = {
  "California": {
    country: "USA",
    state: "California",
    federalTaxRate: 0.22, // 22% federal tax
    stateTaxRate: 0.093, // 9.3% state tax
    medicareRate: 0.0145, // 1.45% medicare
    socialSecurityRate: 0.062, // 6.2% social security
    additionalTaxes: [
      { name: "CA SDI", rate: 0.009, maxAmount: 1578.31 } // CA State Disability Insurance
    ]
  },
  "New York": {
    country: "USA",
    state: "New York",
    federalTaxRate: 0.22,
    stateTaxRate: 0.065, 
    medicareRate: 0.0145,
    socialSecurityRate: 0.062,
    additionalTaxes: []
  },
  // Default USA tax rates if state is not specified
  "DEFAULT": {
    country: "USA",
    federalTaxRate: 0.22,
    stateTaxRate: 0.05, // average state tax
    medicareRate: 0.0145,
    socialSecurityRate: 0.062,
    additionalTaxes: []
  }
};

const INDIA_TAX_RULES: Record<string, TaxRules> = {
  // Simplified India tax rates
  "DEFAULT": {
    country: "India",
    federalTaxRate: 0.1, // very simplified
    stateTaxRate: 0,
    medicareRate: 0,
    socialSecurityRate: 0.12, // PF contribution
    additionalTaxes: [
      { name: "Professional Tax", rate: 0.002, maxAmount: 2500 }
    ]
  }
};

/**
 * Gets tax rules based on employee's location
 */
export const getTaxRules = (employee: Employee): TaxRules => {
  let country = "USA"; // Default country
  let state = "";

  // Extract country and state from address
  if (employee.address) {
    const addressParts = employee.address.split(',').map(part => part.trim());
    const lastPart = addressParts[addressParts.length - 1];
    
    // Very simplified check - in reality would need more robust parsing
    if (lastPart === "India") {
      country = "India";
    } else if (lastPart.includes("CA") || lastPart.includes("California")) {
      state = "California";
    } else if (lastPart.includes("NY") || lastPart.includes("New York")) {
      state = "New York";
    }
    
    // Could also use employee.taxWithholdings?.state if available
    if (employee.taxWithholdings?.state) {
      state = employee.taxWithholdings.state;
    }
  }
  
  // Look up tax rules based on country and state
  if (country === "India") {
    return INDIA_TAX_RULES["DEFAULT"];
  } else {
    // USA
    if (state && USA_TAX_RULES[state]) {
      return USA_TAX_RULES[state];
    } else {
      return USA_TAX_RULES["DEFAULT"];
    }
  }
};

/**
 * Calculate taxes for an employee's pay
 */
export const calculateTaxes = (
  employee: Employee,
  grossPay: number, 
  payPeriod: "Weekly" | "Bi-Weekly" | "Monthly" | "Semi-Monthly",
  additionalDeductions: DeductionDetail[] = []
): PayrollTaxResult => {
  try {
    // Get tax rules based on employee's location
    const taxRules = getTaxRules(employee);
    
    // Annualize the gross pay for tax calculation
    let annualizedPay = grossPay;
    switch (payPeriod) {
      case "Weekly":
        annualizedPay = grossPay * 52;
        break;
      case "Bi-Weekly":
        annualizedPay = grossPay * 26;
        break;
      case "Semi-Monthly":
        annualizedPay = grossPay * 24;
        break;
      case "Monthly":
        annualizedPay = grossPay * 12;
        break;
    }
    
    // Calculate taxable income (could add pre-tax deductions here)
    const taxableIncome = annualizedPay;
    
    // Calculate taxes
    const federalTax = taxableIncome * taxRules.federalTaxRate;
    const stateTax = taxableIncome * taxRules.stateTaxRate;
    const medicare = taxableIncome * taxRules.medicareRate;
    const socialSecurity = Math.min(taxableIncome * taxRules.socialSecurityRate, 9932.80); // 2023 cap is $160,200 * 0.062
    
    // Calculate additional taxes
    let additionalTaxTotal = 0;
    const additionalTaxDetails: DeductionDetail[] = [];
    
    if (taxRules.additionalTaxes) {
      taxRules.additionalTaxes.forEach(tax => {
        let taxAmount = taxableIncome * tax.rate;
        if (tax.maxAmount && taxAmount > tax.maxAmount) {
          taxAmount = tax.maxAmount;
        }
        additionalTaxTotal += taxAmount;
        additionalTaxDetails.push({
          name: tax.name,
          amount: taxAmount / 12, // Monthly amount
          rate: tax.rate
        });
      });
    }
    
    // Total annual taxes
    const totalAnnualTaxes = federalTax + stateTax + medicare + socialSecurity + additionalTaxTotal;
    
    // Convert back to the pay period
    let periodFactor = 12; // Monthly by default
    switch (payPeriod) {
      case "Weekly":
        periodFactor = 52;
        break;
      case "Bi-Weekly":
        periodFactor = 26;
        break;
      case "Semi-Monthly":
        periodFactor = 24;
        break;
    }
    
    const totalPeriodTaxes = totalAnnualTaxes / periodFactor;
    
    // Calculate net pay
    const netPay = grossPay - totalPeriodTaxes;
    
    // Build list of deductions for the pay stub
    const deductions: DeductionDetail[] = [
      { name: "Federal Income Tax", amount: federalTax / periodFactor, rate: taxRules.federalTaxRate },
      { name: "State Income Tax", amount: stateTax / periodFactor, rate: taxRules.stateTaxRate },
      { name: "Medicare", amount: medicare / periodFactor, rate: taxRules.medicareRate },
      { name: "Social Security", amount: socialSecurity / periodFactor, rate: taxRules.socialSecurityRate },
      ...additionalTaxDetails,
      ...additionalDeductions
    ];
    
    return {
      grossPay,
      netPay,
      deductions,
      taxableIncome: taxableIncome / periodFactor,
      totalTaxes: totalPeriodTaxes
    };
  } catch (error) {
    console.error("Error calculating taxes:", error);
    toast({
      title: "Tax Calculation Error",
      description: "There was an error calculating taxes. Please check employee information.",
      variant: "destructive",
    });
    
    // Return default values with no deductions
    return {
      grossPay,
      netPay: grossPay,
      deductions: [],
      taxableIncome: grossPay,
      totalTaxes: 0
    };
  }
};
