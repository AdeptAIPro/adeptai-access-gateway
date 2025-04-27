
import { taxApiClient, TaxCalculationResponse } from './ExternalTaxApiClient';
import { TaxRateResponse } from './types';
import { toast } from '@/hooks/use-toast';

/**
 * Check if the tax API is available for a given country and state
 */
export const checkTaxApiAvailability = async (
  country: string, 
  state?: string
): Promise<{ federal: boolean; state: boolean }> => {
  try {
    // For now, we're just simulating API availability checks
    // In a production environment, this would make a real API call
    
    // Simulate an API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Default response - APIs available for US
    const result = {
      federal: country === 'USA',
      state: country === 'USA' && !!state
    };
    
    // Log availability
    console.log(`Tax API availability check - Federal: ${result.federal}, State: ${result.state}`);
    
    return result;
  } catch (error) {
    console.error('Error checking tax API availability:', error);
    return { federal: false, state: false };
  }
};

/**
 * Fetch federal tax rates from the external tax API
 */
export const fetchFederalTaxRates = async (
  country: string,
  income: number,
  filingStatus: string,
  allowances: number = 0,
  additionalWithholding: number = 0
): Promise<TaxRateResponse | null> => {
  try {
    if (country !== 'USA') {
      console.log(`Federal tax rates currently only supported for USA, not ${country}`);
      return null;
    }
    
    console.log(`Fetching federal tax rates for income: ${income}, filing status: ${filingStatus}`);
    
    // Call the external tax API
    const taxResponse = await taxApiClient.calculateFederalTaxes({
      income,
      payPeriod: 'bi-weekly', // Default to bi-weekly
      filingStatus,
      allowances,
      additionalWithholding,
      year: new Date().getFullYear(),
      state: undefined
    });
    
    if (!taxResponse) {
      return null;
    }
    
    // Map the API response to our internal format
    return {
      federalTaxRate: taxResponse.federalTaxRate,
      medicareRate: taxResponse.medicareTax / income,
      socialSecurityRate: taxResponse.socialSecurityTax / income,
      effectiveDate: taxResponse.effectiveDate,
      additionalTaxes: taxResponse.additionalMedicareTax ? [
        { 
          name: "Additional Medicare Tax", 
          rate: taxResponse.additionalMedicareTax / income 
        }
      ] : []
    };
  } catch (error) {
    console.error('Error fetching federal tax rates:', error);
    toast({
      title: "API Connection Error",
      description: `Failed to connect to federal tax agency API`,
      variant: "destructive",
    });
    return null;
  }
};

/**
 * Fetch state tax rates from the external tax API
 */
export const fetchStateTaxRates = async (
  country: string,
  state: string,
  income: number,
  filingStatus: string
): Promise<TaxRateResponse | null> => {
  try {
    if (country !== 'USA') {
      console.log(`State tax rates currently only supported for USA, not ${country}`);
      return null;
    }
    
    console.log(`Fetching state tax rates for ${state}, income: ${income}, filing status: ${filingStatus}`);
    
    // Call the external tax API
    const taxResponse = await taxApiClient.calculateStateTaxes({
      income,
      payPeriod: 'bi-weekly', // Default to bi-weekly
      filingStatus,
      state,
      year: new Date().getFullYear()
    });
    
    if (!taxResponse) {
      // For states with no income tax, return zeros
      if (state === 'TX' || state === 'Texas') {
        return {
          stateTaxRate: 0,
          effectiveDate: new Date().toISOString(),
          additionalTaxes: []
        };
      }
      return null;
    }
    
    // Map the API response to our internal format
    const additionalTaxes = [];
    
    if (taxResponse.localTax) {
      additionalTaxes.push({ 
        name: "Local Income Tax", 
        rate: taxResponse.localTax / income 
      });
    }
    
    if (taxResponse.disabilityInsurance) {
      additionalTaxes.push({ 
        name: state === 'California' ? "CA SDI" : "Disability Insurance", 
        rate: taxResponse.disabilityInsurance / income,
        maxAmount: state === 'California' ? 1578.31 : undefined
      });
    }
    
    return {
      stateTaxRate: taxResponse.stateTaxRate,
      effectiveDate: taxResponse.effectiveDate,
      additionalTaxes
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
 * Calculate all applicable taxes using the external tax API
 */
export const calculateTaxesViaApi = async (
  income: number,
  payPeriod: string,
  filingStatus: string,
  state?: string,
  allowances: number = 0,
  additionalWithholding: number = 0,
  pretaxDeductions: number = 0
): Promise<TaxCalculationResponse> => {
  try {
    // Adjust for pre-tax deductions
    const taxableIncome = Math.max(0, income - pretaxDeductions);
    
    // Call tax API to calculate all taxes
    return await taxApiClient.calculateAllTaxes({
      income: taxableIncome,
      payPeriod,
      filingStatus,
      state,
      allowances,
      additionalWithholding,
      year: new Date().getFullYear()
    });
  } catch (error) {
    console.error('Error calculating taxes via API:', error);
    toast({
      title: "Tax Calculation Error",
      description: "Failed to calculate taxes. Using fallback calculations.",
      variant: "destructive",
    });
    
    return {
      federal: null,
      state: null,
      errors: [`Tax API error: ${error}`]
    };
  }
}
