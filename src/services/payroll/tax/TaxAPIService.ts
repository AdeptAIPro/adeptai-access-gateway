
import { toast } from "@/hooks/use-toast";

// Tax agency API interfaces
export interface TaxRateResponse {
  federalTaxRate?: number;
  stateTaxRate?: number;
  medicareRate?: number;
  socialSecurityRate?: number;
  additionalTaxes?: Array<{
    name: string;
    rate: number;
    maxAmount?: number;
  }>;
  effectiveDate: string;
  expirationDate?: string;
}

export interface TaxAgencyCredentials {
  apiKey: string;
  apiEndpoint: string;
  apiVersion?: string;
}

// Configuration for different tax agencies
const TAX_AGENCIES = {
  USA: {
    FEDERAL: {
      name: "IRS",
      apiEndpoint: "https://api.irs.gov/tax-rates",
      testEndpoint: "https://api.irs.gov/test/tax-rates"
    },
    STATES: {
      "California": {
        name: "California Franchise Tax Board",
        apiEndpoint: "https://api.ftb.ca.gov/tax-rates",
        testEndpoint: "https://api.ftb.ca.gov/test/tax-rates"
      },
      "New York": {
        name: "New York Department of Taxation and Finance",
        apiEndpoint: "https://api.tax.ny.gov/tax-rates",
        testEndpoint: "https://api.tax.ny.gov/test/tax-rates"
      }
    }
  },
  INDIA: {
    FEDERAL: {
      name: "Income Tax Department of India",
      apiEndpoint: "https://api.incometaxindiaefiling.gov.in/tax-rates",
      testEndpoint: "https://api.incometaxindiaefiling.gov.in/test/tax-rates"
    }
  }
};

/**
 * Fetch current tax rates from federal tax agency API
 */
export const fetchFederalTaxRates = async (
  country: string,
  income: number,
  filingStatus: string,
  credentials?: TaxAgencyCredentials
): Promise<TaxRateResponse | null> => {
  try {
    // For demonstration purposes, we'll use a mock implementation
    // In production, this would make an actual API call to the relevant tax agency
    
    console.log(`Fetching federal tax rates for ${country}, income: ${income}, filing status: ${filingStatus}`);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get the appropriate agency configuration
    const agencyConfig = country === "USA" ? 
      TAX_AGENCIES.USA.FEDERAL : 
      TAX_AGENCIES.INDIA.FEDERAL;
      
    console.log(`Using tax agency: ${agencyConfig.name}`);
    
    // Mock response based on country
    if (country === "USA") {
      return {
        federalTaxRate: calculateUSFederalTaxRate(income, filingStatus),
        medicareRate: 0.0145,
        socialSecurityRate: 0.062,
        effectiveDate: new Date().toISOString(),
      };
    } else if (country === "India") {
      return {
        federalTaxRate: calculateIndiaIncomeTaxRate(income),
        socialSecurityRate: 0.12, // PF contribution
        effectiveDate: new Date().toISOString(),
        additionalTaxes: [
          { name: "Professional Tax", rate: 0.002, maxAmount: 2500 }
        ]
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching federal tax rates:", error);
    toast({
      title: "API Connection Error",
      description: `Failed to connect to federal tax agency API for ${country}`,
      variant: "destructive",
    });
    return null;
  }
};

/**
 * Fetch current tax rates from state tax agency API
 */
export const fetchStateTaxRates = async (
  country: string,
  state: string,
  income: number,
  filingStatus: string,
  credentials?: TaxAgencyCredentials
): Promise<TaxRateResponse | null> => {
  try {
    // For demonstration purposes, we'll use a mock implementation
    // In production, this would make an actual API call to the relevant tax agency
    
    console.log(`Fetching state tax rates for ${state}, income: ${income}, filing status: ${filingStatus}`);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Get the appropriate state agency configuration
    const stateConfig = TAX_AGENCIES.USA.STATES[state as keyof typeof TAX_AGENCIES.USA.STATES];
    
    if (!stateConfig && country === "USA") {
      console.log(`No specific API configuration for state: ${state}, using default rates`);
      return {
        stateTaxRate: 0.05, // Default state tax rate
        effectiveDate: new Date().toISOString(),
      };
    }
    
    if (stateConfig) {
      console.log(`Using state tax agency: ${stateConfig.name}`);
    }
    
    // Mock response based on state
    if (state === "California") {
      return {
        stateTaxRate: 0.093,
        effectiveDate: new Date().toISOString(),
        additionalTaxes: [
          { name: "CA SDI", rate: 0.009, maxAmount: 1578.31 }
        ]
      };
    } else if (state === "New York") {
      return {
        stateTaxRate: 0.065,
        effectiveDate: new Date().toISOString(),
      };
    } else if (country === "USA") {
      // Default USA state
      return {
        stateTaxRate: 0.05,
        effectiveDate: new Date().toISOString(),
      };
    }
    
    // For non-USA countries or states not found
    return {
      stateTaxRate: 0,
      effectiveDate: new Date().toISOString(),
    };
  } catch (error) {
    console.error(`Error fetching tax rates for state ${state}:`, error);
    toast({
      title: "API Connection Error",
      description: `Failed to connect to state tax agency API for ${state}`,
      variant: "destructive",
    });
    return null;
  }
};

/**
 * Calculate federal tax rate for USA based on income and filing status
 * This is a simplified calculation for demonstration purposes
 */
const calculateUSFederalTaxRate = (income: number, filingStatus: string): number => {
  // Simplified progressive tax brackets
  if (income <= 10275) return 0.10;
  if (income <= 41775) return 0.12;
  if (income <= 89075) return 0.22;
  if (income <= 170050) return 0.24;
  if (income <= 215950) return 0.32;
  if (income <= 539900) return 0.35;
  return 0.37;
};

/**
 * Calculate income tax rate for India based on income
 * This is a simplified calculation for demonstration purposes
 */
const calculateIndiaIncomeTaxRate = (income: number): number => {
  // Simplified tax slabs in INR
  if (income <= 250000) return 0;
  if (income <= 500000) return 0.05;
  if (income <= 750000) return 0.10;
  if (income <= 1000000) return 0.15;
  if (income <= 1250000) return 0.20;
  if (income <= 1500000) return 0.25;
  return 0.30;
};

/**
 * Check if tax agency APIs are available
 * This can be used to test connectivity before attempting to fetch tax rates
 */
export const checkTaxApiAvailability = async (
  country: string,
  state?: string
): Promise<{federal: boolean, state: boolean}> => {
  try {
    // Simulate API availability check
    await new Promise(resolve => setTimeout(resolve, 200));
    
    console.log(`Checking tax API availability for ${country}${state ? ', ' + state : ''}`);
    
    // In a real implementation, this would ping the API endpoints to check availability
    return {
      federal: true,
      state: state ? true : false
    };
  } catch (error) {
    console.error("Error checking tax API availability:", error);
    return {
      federal: false,
      state: false
    };
  }
};
