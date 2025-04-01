
/**
 * Types for tax API services
 */

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

export interface TaxApiAvailabilityResult {
  federal: boolean;
  state: boolean;
}
