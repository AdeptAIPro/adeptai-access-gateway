
import { toast } from "@/hooks/use-toast";
import { TaxRateResponse, TaxAgencyCredentials } from "./types";
import { TAX_AGENCIES } from "./config";

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
