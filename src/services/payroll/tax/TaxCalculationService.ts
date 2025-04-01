
import { Employee } from "@/types/employee";
import { toast } from "@/hooks/use-toast";
import { fetchFederalTaxRates, fetchStateTaxRates, checkTaxApiAvailability } from "./TaxAPIService";

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
  lastUpdated?: string;
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

// For demonstration, these are fallback tax rules if API connection fails
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
 * Gets tax rules based on employee's location, fetching from APIs when possible
 */
export const getTaxRules = async (employee: Employee): Promise<TaxRules> => {
  let country = "USA"; // Default country
  let state = "";
  let filingStatus = "Single"; // Default filing status

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
  }
  
  // Use tax withholdings if available
  if (employee.taxWithholdings) {
    if (employee.taxWithholdings.state) {
      state = employee.taxWithholdings.state;
    }
    if (employee.taxWithholdings.federalFilingStatus) {
      filingStatus = employee.taxWithholdings.federalFilingStatus;
    }
  }

  try {
    // Check if tax APIs are available
    const apiAvailability = await checkTaxApiAvailability(country, state);
    
    if (apiAvailability.federal || apiAvailability.state) {
      console.log("Tax APIs available, fetching current rates...");
      
      // For income-based tax calculations, we'd need the annualized income
      // This is simplified and would need to be calculated based on actual salary/hourly rate
      const annualIncome = parseFloat(employee.payRate) * 2080; // Assuming 40 hours/week, 52 weeks
      
      // Get federal tax rates from API
      const federalRates = apiAvailability.federal ? 
        await fetchFederalTaxRates(country, annualIncome, filingStatus) : null;
      
      // Get state tax rates from API if applicable
      const stateRates = (apiAvailability.state && state) ? 
        await fetchStateTaxRates(country, state, annualIncome, filingStatus) : null;
      
      if (federalRates || stateRates) {
        // Build tax rules from API responses
        const taxRules: TaxRules = {
          country,
          state: state || undefined,
          federalTaxRate: federalRates?.federalTaxRate || 
            (country === "USA" ? USA_TAX_RULES.DEFAULT.federalTaxRate : INDIA_TAX_RULES.DEFAULT.federalTaxRate),
          stateTaxRate: stateRates?.stateTaxRate || 
            (state && country === "USA" ? USA_TAX_RULES[state]?.stateTaxRate || USA_TAX_RULES.DEFAULT.stateTaxRate : 0),
          medicareRate: federalRates?.medicareRate || 
            (country === "USA" ? USA_TAX_RULES.DEFAULT.medicareRate : 0),
          socialSecurityRate: federalRates?.socialSecurityRate || 
            (country === "USA" ? USA_TAX_RULES.DEFAULT.socialSecurityRate : INDIA_TAX_RULES.DEFAULT.socialSecurityRate),
          additionalTaxes: [
            ...(federalRates?.additionalTaxes || []),
            ...(stateRates?.additionalTaxes || [])
          ],
          lastUpdated: new Date().toISOString()
        };
        
        console.log("Dynamically fetched tax rules:", taxRules);
        return taxRules;
      }
    }

    console.log("Falling back to static tax rules");
    // Fall back to static tax rules if API call fails
    if (country === "India") {
      return INDIA_TAX_RULES.DEFAULT;
    } else {
      // USA
      if (state && USA_TAX_RULES[state]) {
        return USA_TAX_RULES[state];
      } else {
        return USA_TAX_RULES.DEFAULT;
      }
    }
  } catch (error) {
    console.error("Error fetching tax rules:", error);
    toast({
      title: "Tax Service Error",
      description: "Could not connect to tax services. Using fallback tax rates.",
      variant: "destructive",
    });

    // Fallback to static tax rules
    if (country === "India") {
      return INDIA_TAX_RULES.DEFAULT;
    } else {
      // USA
      if (state && USA_TAX_RULES[state]) {
        return USA_TAX_RULES[state];
      } else {
        return USA_TAX_RULES.DEFAULT;
      }
    }
  }
};

/**
 * Calculate taxes for an employee's pay
 */
export const calculateTaxes = async (
  employee: Employee,
  grossPay: number, 
  payPeriod: "Weekly" | "Bi-Weekly" | "Monthly" | "Semi-Monthly",
  additionalDeductions: DeductionDetail[] = []
): Promise<PayrollTaxResult> => {
  try {
    // Get tax rules based on employee's location - now async
    const taxRules = await getTaxRules(employee);
    
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
    
    // Show source of tax data in console
    console.log(`Tax calculation for ${employee.name} using ${taxRules.lastUpdated ? 'API-sourced' : 'static'} tax rates`);
    
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
