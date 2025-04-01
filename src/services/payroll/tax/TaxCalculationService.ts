import { Employee } from "@/types/employee";
import { toast } from "@/hooks/use-toast";
import { 
  fetchFederalTaxRates, 
  fetchStateTaxRates, 
  checkTaxApiAvailability,
  TaxRateResponse
} from "./api/TaxAPIService";

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

  if (employee.address) {
    const addressParts = employee.address.split(',').map(part => part.trim());
    const lastPart = addressParts[addressParts.length - 1];
    
    if (lastPart === "India") {
      country = "India";
    } else if (lastPart.includes("CA") || lastPart.includes("California")) {
      state = "California";
    } else if (lastPart.includes("NY") || lastPart.includes("New York")) {
      state = "New York";
    }
  }
  
  if (employee.taxWithholdings) {
    if (employee.taxWithholdings.state) {
      state = employee.taxWithholdings.state;
    }
    if (employee.taxWithholdings.federalFilingStatus) {
      filingStatus = employee.taxWithholdings.federalFilingStatus;
    }
  }

  try {
    const apiAvailability = await checkTaxApiAvailability(country, state);
    
    if (apiAvailability.federal || apiAvailability.state) {
      console.log("Tax APIs available, fetching current rates...");
      
      const annualIncome = parseFloat(employee.payRate) * 2080;
      
      const federalRates = apiAvailability.federal ? 
        await fetchFederalTaxRates(country, annualIncome, filingStatus) : null;
      
      const stateRates = (apiAvailability.state && state) ? 
        await fetchStateTaxRates(country, state, annualIncome, filingStatus) : null;
      
      if (federalRates || stateRates) {
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
    if (country === "India") {
      return INDIA_TAX_RULES.DEFAULT;
    } else {
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

    if (country === "India") {
      return INDIA_TAX_RULES.DEFAULT;
    } else {
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
    const taxRules = await getTaxRules(employee);
    
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
    
    const taxableIncome = annualizedPay;
    
    const federalTax = taxableIncome * taxRules.federalTaxRate;
    const stateTax = taxableIncome * taxRules.stateTaxRate;
    const medicare = taxableIncome * taxRules.medicareRate;
    const socialSecurity = Math.min(taxableIncome * taxRules.socialSecurityRate, 9932.80);
    
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
          amount: taxAmount / 12,
          rate: tax.rate
        });
      });
    }
    
    const totalAnnualTaxes = federalTax + stateTax + medicare + socialSecurity + additionalTaxTotal;
    
    let periodFactor = 12;
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
    
    const netPay = grossPay - totalPeriodTaxes;
    
    console.log(`Tax calculation for ${employee.name} using ${taxRules.lastUpdated ? 'API-sourced' : 'static'} tax rates`);
    
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
    
    return {
      grossPay,
      netPay: grossPay,
      deductions: [],
      taxableIncome: grossPay,
      totalTaxes: 0
    };
  }
};
