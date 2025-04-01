
import { TaxApiAvailabilityResult } from "./types";

/**
 * Check if tax agency APIs are available
 * This can be used to test connectivity before attempting to fetch tax rates
 */
export const checkTaxApiAvailability = async (
  country: string,
  state?: string
): Promise<TaxApiAvailabilityResult> => {
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
