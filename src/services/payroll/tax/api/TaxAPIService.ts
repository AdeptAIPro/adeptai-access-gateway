
/**
 * Main export file for Tax API Services
 */

export * from "./types";
export * from "./federalTaxService";
export * from "./stateTaxService";
export * from "./availabilityService";
export * from "./calculators";

// Export the calculateTaxesViaApi function that's imported in TaxCalculationService
export const calculateTaxesViaApi = async (income: number, filingStatus: string, year: number) => {
  console.log('Calculating taxes via API for', { income, filingStatus, year });
  // Implementation would typically call an API endpoint
  return {
    totalTax: income * 0.25, // Dummy implementation
    federalTax: income * 0.15,
    stateTax: income * 0.05,
    localTax: income * 0.03,
    medicareLevy: income * 0.015,
    socialSecurity: income * 0.062
  };
};

// Export the TaxRateResponse type that's imported in TaxCalculationService
export type TaxRateResponse = {
  federalRate: number;
  stateRate: number;
  localRate?: number;
  effectiveDate: string;
};
