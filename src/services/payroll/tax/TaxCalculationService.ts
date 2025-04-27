
import { Employee, PreTaxDeduction } from "@/types/employee";
import { toast } from "@/hooks/use-toast";
import { 
  fetchFederalTaxRates, 
  fetchStateTaxRates, 
  checkTaxApiAvailability,
  calculateTaxesViaApi,
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
  preTaxDeductions?: DeductionDetail[];
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
  "Texas": {
    country: "USA",
    state: "Texas",
    federalTaxRate: 0.22, 
    stateTaxRate: 0, // No state income tax in Texas
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
 * Calculate pre-tax deductions for an employee
 */
export const calculatePreTaxDeductions = (
  employee: Employee,
  grossPay: number
): { totalDeduction: number, deductionDetails: DeductionDetail[] } => {
  let totalDeduction = 0;
  const deductionDetails: DeductionDetail[] = [];
  
  if (employee.preTaxDeductions && employee.preTaxDeductions.length > 0) {
    employee.preTaxDeductions.forEach((deduction: PreTaxDeduction) => {
      let deductionAmount = 0;
      
      // Calculate deduction amount (either fixed amount or percentage)
      if (deduction.amount) {
        deductionAmount = deduction.amount;
      } else if (deduction.percentage) {
        deductionAmount = grossPay * (deduction.percentage / 100);
      }
      
      // Apply annual limit if specified
      if (deduction.limit?.annual) {
        const remainingLimit = deduction.limit.remaining ?? deduction.limit.annual;
        if (deductionAmount > remainingLimit) {
          deductionAmount = remainingLimit;
        }
      }
      
      // Add employer match for 401(k) if applicable
      let employerMatch = 0;
      if (deduction.type === '401k' && deduction.employerMatch) {
        const matchPercentage = deduction.employerMatch.percentage / 100;
        const matchUpTo = deduction.employerMatch.upTo / 100 * grossPay;
        
        employerMatch = Math.min(
          deductionAmount * matchPercentage,
          matchUpTo
        );
      }
      
      totalDeduction += deductionAmount;
      
      // Add to deduction details
      deductionDetails.push({
        name: deduction.name,
        amount: deductionAmount
      });
      
      // Add employer match to deduction details if applicable
      if (employerMatch > 0) {
        deductionDetails.push({
          name: `${deduction.name} (Employer Match)`,
          amount: employerMatch
        });
      }
    });
  }
  
  return { totalDeduction, deductionDetails };
};

/**
 * Gets tax rules based on employee's location, fetching from APIs when possible
 */
export const getTaxRules = async (employee: Employee, useDynamicRates: boolean = false): Promise<TaxRules> => {
  let country = "USA"; // Default country
  let state = "";
  let filingStatus = "Single"; // Default filing status

  if (employee.address) {
    // Handle address as string or object
    if (typeof employee.address === 'string') {
      const addressParts = employee.address.split(',').map(part => part.trim());
      const lastPart = addressParts[addressParts.length - 1];
      
      if (lastPart === "India") {
        country = "India";
      } else if (lastPart.includes("TX") || lastPart.includes("Texas")) {
        state = "Texas";
      } else if (lastPart.includes("CA") || lastPart.includes("California")) {
        state = "California";
      } else if (lastPart.includes("NY") || lastPart.includes("New York")) {
        state = "New York";
      }
    } else {
      // Address is an object
      state = employee.address.state;
      if (employee.address.state === "TX") {
        state = "Texas";
      } else if (employee.address.state === "CA") {
        state = "California";
      } else if (employee.address.state === "NY") {
        state = "New York";
      }
    }
  }
  
  // Get filing status from tax withholdings if available
  if (employee.taxWithholdings) {
    if (employee.taxWithholdings.state) {
      state = employee.taxWithholdings.state;
    }
    if (employee.taxWithholdings.federalFilingStatus) {
      filingStatus = employee.taxWithholdings.federalFilingStatus;
    }
  } else if (employee.taxInfo) {
    if (employee.taxInfo.federalFilingStatus) {
      filingStatus = employee.taxInfo.federalFilingStatus;
    }
  }

  try {
    if (useDynamicRates) {
      const apiAvailability = await checkTaxApiAvailability(country, state);
      
      if (apiAvailability.federal || apiAvailability.state) {
        console.log("Tax APIs available, fetching current rates...");
        
        // Calculate annual income based on pay rate and frequency
        const payRate = parseFloat(employee.payRate);
        let annualIncome = 0;
        
        if (employee.salary) {
          annualIncome = employee.salary;
        } else {
          // Estimate annual income based on hourly rate
          const hoursPerWeek = employee.employmentType === 'full-time' ? 40 : 20;
          annualIncome = payRate * hoursPerWeek * 52;
        }
        
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
              (state && country === "USA" ? (USA_TAX_RULES[state as keyof typeof USA_TAX_RULES]?.stateTaxRate || USA_TAX_RULES.DEFAULT.stateTaxRate) : 0),
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
    }

    console.log("Using static tax rules");
    if (country === "India") {
      return INDIA_TAX_RULES.DEFAULT;
    } else {
      if (state && Object.keys(USA_TAX_RULES).includes(state)) {
        return USA_TAX_RULES[state as keyof typeof USA_TAX_RULES];
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
      if (state && Object.keys(USA_TAX_RULES).includes(state)) {
        return USA_TAX_RULES[state as keyof typeof USA_TAX_RULES];
      } else {
        return USA_TAX_RULES.DEFAULT;
      }
    }
  }
};

/**
 * Calculate taxes for an employee's pay using real-time tax API when possible
 */
export const calculateTaxes = async (
  employee: Employee,
  grossPay: number, 
  payPeriod: "Weekly" | "Bi-Weekly" | "Monthly" | "Semi-Monthly",
  useDynamicRates: boolean = false,
  additionalDeductions: DeductionDetail[] = []
): Promise<PayrollTaxResult> => {
  try {
    // Calculate pre-tax deductions
    const { totalDeduction: preTaxDeductionTotal, deductionDetails: preTaxDeductionDetails } = 
      calculatePreTaxDeductions(employee, grossPay);
    
    // Calculate taxable income after pre-tax deductions
    const taxableIncome = grossPay - preTaxDeductionTotal;
    
    // Get country and state information
    let country = "USA";
    let state: string | undefined = undefined;
    let filingStatus = "Single";
    
    if (employee.address) {
      if (typeof employee.address === 'string') {
        const addressParts = employee.address.split(',').map(part => part.trim());
        if (addressParts.some(part => part === "India")) {
          country = "India";
        }
        
        const stateZip = addressParts[addressParts.length - 1] || '';
        if (stateZip.includes("TX")) {
          state = "Texas";
        } else if (stateZip.includes("CA")) {
          state = "California";
        } else if (stateZip.includes("NY")) {
          state = "New York";
        }
      } else {
        state = employee.address.state;
      }
    }
    
    if (employee.taxWithholdings?.state) {
      state = employee.taxWithholdings.state;
    }
    
    if (employee.taxWithholdings?.federalFilingStatus) {
      filingStatus = employee.taxWithholdings.federalFilingStatus;
    } else if (employee.taxInfo?.federalFilingStatus) {
      filingStatus = employee.taxInfo.federalFilingStatus;
    }
    
    let additionalWithholding = 0;
    if (employee.taxWithholdings?.additionalFederalWithholding) {
      additionalWithholding = employee.taxWithholdings.additionalFederalWithholding;
    }
    
    let allowances = 0;
    if (employee.taxWithholdings?.federalAllowances) {
      allowances = Number(employee.taxWithholdings.federalAllowances);
    } else if (employee.taxInfo?.federalExemptions) {
      allowances = Number(employee.taxInfo.federalExemptions);
    }
    
    // Try to get tax calculations from the API first
    if (useDynamicRates) {
      try {
        console.log("Using dynamic tax calculations");
        const taxResults = await calculateTaxesViaApi(
          grossPay,
          payPeriod,
          filingStatus,
          state,
          allowances,
          additionalWithholding,
          preTaxDeductionTotal
        );
        
        // If we got valid federal tax calculations
        if (taxResults.federal) {
          const deductions: DeductionDetail[] = [];
          
          // Add federal income tax
          deductions.push({
            name: "Federal Income Tax",
            amount: taxResults.federal.federalIncomeTax,
            rate: taxResults.federal.federalTaxRate
          });
          
          // Add FICA taxes
          deductions.push({
            name: "Social Security",
            amount: taxResults.federal.socialSecurityTax,
            rate: 0.062
          });
          
          deductions.push({
            name: "Medicare",
            amount: taxResults.federal.medicareTax,
            rate: 0.0145
          });
          
          // Add additional Medicare tax if applicable
          if (taxResults.federal.additionalMedicareTax) {
            deductions.push({
              name: "Additional Medicare Tax",
              amount: taxResults.federal.additionalMedicareTax,
              rate: 0.009
            });
          }
          
          // Add state tax if available
          if (taxResults.state && taxResults.state.stateTax > 0) {
            deductions.push({
              name: `${state} State Income Tax`,
              amount: taxResults.state.stateTax,
              rate: taxResults.state.stateTaxRate
            });
            
            // Add local tax if applicable
            if (taxResults.state.localTax && taxResults.state.localTax > 0) {
              deductions.push({
                name: "Local Income Tax",
                amount: taxResults.state.localTax
              });
            }
            
            // Add disability insurance if applicable
            if (taxResults.state.disabilityInsurance && taxResults.state.disabilityInsurance > 0) {
              deductions.push({
                name: state === "California" ? "CA SDI" : "Disability Insurance",
                amount: taxResults.state.disabilityInsurance
              });
            }
          }
          
          // Add any additional deductions
          deductions.push(...additionalDeductions);
          
          // Calculate total taxes
          let totalTaxes = 0;
          deductions.forEach(d => totalTaxes += d.amount);
          
          // Calculate net pay
          const netPay = grossPay - totalTaxes - preTaxDeductionTotal;
          
          return {
            grossPay,
            netPay,
            deductions,
            taxableIncome,
            totalTaxes,
            preTaxDeductions: preTaxDeductionDetails
          };
        }
      } catch (error) {
        console.error("Error calculating taxes via API:", error);
        // Fall back to static calculations
      }
    }
    
    // Fall back to static tax calculations
    const taxRules = await getTaxRules(employee);
    
    // Calculate annual equivalent of the pay for tax brackets
    let annualizedPay = taxableIncome;
    switch (payPeriod) {
      case "Weekly":
        annualizedPay = taxableIncome * 52;
        break;
      case "Bi-Weekly":
        annualizedPay = taxableIncome * 26;
        break;
      case "Semi-Monthly":
        annualizedPay = taxableIncome * 24;
        break;
      case "Monthly":
        annualizedPay = taxableIncome * 12;
        break;
    }
    
    // Apply tax rules
    const federalTax = taxableIncome * taxRules.federalTaxRate;
    const stateTax = taxableIncome * taxRules.stateTaxRate;
    const medicare = taxableIncome * taxRules.medicareRate;
    
    // Social Security has an annual limit
    const socialSecurityWageBase = 160200; // 2023 value
    const socialSecurityYTD = employee.ytdTaxes?.fica || 0;
    const remainingSocialSecurityWage = Math.max(0, socialSecurityWageBase - socialSecurityYTD);
    const socialSecurity = Math.min(
      taxableIncome * taxRules.socialSecurityRate, 
      remainingSocialSecurityWage * taxRules.socialSecurityRate
    );
    
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
          amount: taxAmount,
          rate: tax.rate
        });
      });
    }
    
    // Calculate total taxes
    const totalPeriodTaxes = federalTax + stateTax + medicare + socialSecurity + additionalTaxTotal;
    
    // Calculate net pay
    const netPay = grossPay - totalPeriodTaxes - preTaxDeductionTotal;
    
    console.log(`Tax calculation for ${employee.firstName} ${employee.lastName} using ${taxRules.lastUpdated ? 'API-sourced' : 'static'} tax rates`);
    
    // Create deductions array for detailed breakdown
    const deductions: DeductionDetail[] = [
      { name: "Federal Income Tax", amount: federalTax, rate: taxRules.federalTaxRate },
      { name: "State Income Tax", amount: stateTax, rate: taxRules.stateTaxRate },
      { name: "Medicare", amount: medicare, rate: taxRules.medicareRate },
      { name: "Social Security", amount: socialSecurity, rate: taxRules.socialSecurityRate },
      ...additionalTaxDetails,
      ...additionalDeductions
    ];
    
    return {
      grossPay,
      netPay,
      deductions,
      taxableIncome,
      totalTaxes: totalPeriodTaxes,
      preTaxDeductions: preTaxDeductionDetails
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
