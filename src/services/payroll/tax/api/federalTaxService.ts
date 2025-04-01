
import { toast } from "@/hooks/use-toast";
import { TaxRateResponse, TaxAgencyCredentials } from "./types";
import { TAX_AGENCIES } from "./config";
import { calculateUSFederalTaxRate, calculateIndiaIncomeTaxRate } from "./calculators";

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
