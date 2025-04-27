
import axios from 'axios';
import { toast } from '@/hooks/use-toast';

/**
 * External Tax API endpoints for dynamic tax rates
 */
interface TaxApiEndpoints {
  federal: string;
  state?: string;
}

/**
 * Tax API request parameters
 */
interface TaxApiRequestParams {
  income: number;
  payPeriod: string;
  filingStatus: string;
  allowances?: number;
  state?: string;
  year: number;
  additionalWithholding?: number;
}

/**
 * Federal tax calculation response from external API
 */
interface FederalTaxResponse {
  federalIncomeTax: number;
  federalTaxRate: number;
  socialSecurityTax: number;
  medicareTax: number;
  additionalMedicareTax?: number;
  ficaTotal: number;
  effectiveDate: string;
}

/**
 * State tax calculation response from external API
 */
interface StateTaxResponse {
  stateTax: number;
  stateTaxRate: number;
  localTax?: number;
  unemploymentInsurance?: number;
  disabilityInsurance?: number;
  effectiveDate: string;
}

/**
 * Combined tax calculation response
 */
export interface TaxCalculationResponse {
  federal: FederalTaxResponse | null;
  state: StateTaxResponse | null;
  errors?: string[];
}

// Tax API configuration by environment
const TAX_API_CONFIG = {
  development: {
    baseUrl: 'https://api.taxapi.dev/v1',
    apiKey: process.env.TAX_API_KEY || 'demo-key',
    timeout: 5000
  },
  production: {
    baseUrl: 'https://api.taxapi.com/v1',
    apiKey: process.env.TAX_API_KEY,
    timeout: 10000
  }
};

// Default endpoints
const DEFAULT_ENDPOINTS = {
  federal: '/calculate/federal',
  state: '/calculate/state'
};

/**
 * External Tax API Client for real-time tax calculations
 */
export class ExternalTaxApiClient {
  private config: typeof TAX_API_CONFIG.development;
  private endpoints: TaxApiEndpoints;
  
  constructor(environment: 'development' | 'production' = 'development', customEndpoints?: TaxApiEndpoints) {
    this.config = TAX_API_CONFIG[environment];
    this.endpoints = customEndpoints || DEFAULT_ENDPOINTS;
  }

  /**
   * Calculate federal taxes using external API
   */
  async calculateFederalTaxes(params: TaxApiRequestParams): Promise<FederalTaxResponse | null> {
    try {
      console.log(`Fetching federal tax calculations for income: ${params.income}, filing status: ${params.filingStatus}`);
      
      // In development/demo mode, simulate API response
      if (this.config.apiKey === 'demo-key') {
        return this.simulateFederalTaxResponse(params);
      }
      
      const response = await axios.post(`${this.config.baseUrl}${this.endpoints.federal}`, params, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: this.config.timeout
      });
      
      return response.data;
    } catch (error) {
      console.error('Error calculating federal taxes via API:', error);
      return null;
    }
  }
  
  /**
   * Calculate state taxes using external API
   */
  async calculateStateTaxes(params: TaxApiRequestParams): Promise<StateTaxResponse | null> {
    try {
      if (!params.state) {
        console.log('No state specified for tax calculation');
        return null;
      }
      
      console.log(`Fetching state tax calculations for ${params.state}, income: ${params.income}`);
      
      // In development/demo mode, simulate API response
      if (this.config.apiKey === 'demo-key') {
        return this.simulateStateTaxResponse(params);
      }
      
      const response = await axios.post(`${this.config.baseUrl}${this.endpoints.state}`, params, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: this.config.timeout
      });
      
      return response.data;
    } catch (error) {
      console.error(`Error calculating state taxes for ${params.state} via API:`, error);
      return null;
    }
  }
  
  /**
   * Calculate all applicable taxes
   */
  async calculateAllTaxes(params: TaxApiRequestParams): Promise<TaxCalculationResponse> {
    const result: TaxCalculationResponse = {
      federal: null,
      state: null,
      errors: []
    };
    
    // Calculate federal taxes
    try {
      result.federal = await this.calculateFederalTaxes(params);
    } catch (error) {
      result.errors?.push(`Federal tax calculation failed: ${error}`);
    }
    
    // Calculate state taxes if a state is specified
    if (params.state) {
      try {
        result.state = await this.calculateStateTaxes(params);
      } catch (error) {
        result.errors?.push(`State tax calculation failed: ${error}`);
      }
    }
    
    return result;
  }
  
  /**
   * Simulate federal tax API response for development/demo purposes
   */
  private simulateFederalTaxResponse(params: TaxApiRequestParams): FederalTaxResponse {
    // Simplified federal tax calculation logic
    const annualIncome = this.getAnnualizedIncome(params.income, params.payPeriod);
    
    // Apply progressive tax brackets (2023 rates)
    let federalIncomeTax = 0;
    const filingStatus = params.filingStatus.toLowerCase();
    
    if (filingStatus.includes('single') || filingStatus.includes('head')) {
      // Single or Head of Household brackets
      if (annualIncome <= 11000) {
        federalIncomeTax = annualIncome * 0.10;
      } else if (annualIncome <= 44725) {
        federalIncomeTax = 1100 + (annualIncome - 11000) * 0.12;
      } else if (annualIncome <= 95375) {
        federalIncomeTax = 5147 + (annualIncome - 44725) * 0.22;
      } else if (annualIncome <= 182100) {
        federalIncomeTax = 16290 + (annualIncome - 95375) * 0.24;
      } else if (annualIncome <= 231250) {
        federalIncomeTax = 37104 + (annualIncome - 182100) * 0.32;
      } else if (annualIncome <= 578125) {
        federalIncomeTax = 52832 + (annualIncome - 231250) * 0.35;
      } else {
        federalIncomeTax = 174238.25 + (annualIncome - 578125) * 0.37;
      }
    } else {
      // Married filing jointly brackets
      if (annualIncome <= 22000) {
        federalIncomeTax = annualIncome * 0.10;
      } else if (annualIncome <= 89450) {
        federalIncomeTax = 2200 + (annualIncome - 22000) * 0.12;
      } else if (annualIncome <= 190750) {
        federalIncomeTax = 10294 + (annualIncome - 89450) * 0.22;
      } else if (annualIncome <= 364200) {
        federalIncomeTax = 32580 + (annualIncome - 190750) * 0.24;
      } else if (annualIncome <= 462500) {
        federalIncomeTax = 74208 + (annualIncome - 364200) * 0.32;
      } else if (annualIncome <= 693750) {
        federalIncomeTax = 105664 + (annualIncome - 462500) * 0.35;
      } else {
        federalIncomeTax = 186601.50 + (annualIncome - 693750) * 0.37;
      }
    }
    
    // Apply allowances/withholding adjustments if specified
    if (params.allowances) {
      federalIncomeTax -= params.allowances * 4450; // Standard deduction per allowance
      if (federalIncomeTax < 0) federalIncomeTax = 0;
    }
    
    // Add additional withholding if specified
    if (params.additionalWithholding) {
      federalIncomeTax += params.additionalWithholding;
    }
    
    // Adjust back to pay period amount
    federalIncomeTax = this.adjustAmountForPayPeriod(federalIncomeTax, params.payPeriod);
    
    // Calculate FICA
    const socialSecurityRate = 0.062;
    const medicareRate = 0.0145;
    const socialSecurityWage = Math.min(annualIncome, 160200); // 2023 Social Security wage base
    let socialSecurityTax = socialSecurityWage * socialSecurityRate;
    let medicareTax = annualIncome * medicareRate;
    
    // Additional Medicare tax for high earners
    let additionalMedicareTax = 0;
    if ((filingStatus.includes('single') && annualIncome > 200000) || 
        (filingStatus.includes('married') && annualIncome > 250000)) {
      additionalMedicareTax = (annualIncome - (filingStatus.includes('single') ? 200000 : 250000)) * 0.009;
    }
    
    // Adjust FICA for pay period
    socialSecurityTax = this.adjustAmountForPayPeriod(socialSecurityTax, params.payPeriod);
    medicareTax = this.adjustAmountForPayPeriod(medicareTax, params.payPeriod);
    additionalMedicareTax = this.adjustAmountForPayPeriod(additionalMedicareTax, params.payPeriod);
    
    // Calculate effective tax rate
    const totalTax = federalIncomeTax + socialSecurityTax + medicareTax + additionalMedicareTax;
    const effectiveTaxRate = annualIncome > 0 ? totalTax / params.income : 0;
    
    return {
      federalIncomeTax,
      federalTaxRate: effectiveTaxRate,
      socialSecurityTax,
      medicareTax,
      additionalMedicareTax: additionalMedicareTax > 0 ? additionalMedicareTax : undefined,
      ficaTotal: socialSecurityTax + medicareTax + additionalMedicareTax,
      effectiveDate: new Date().toISOString()
    };
  }
  
  /**
   * Simulate state tax API response for development/demo purposes
   */
  private simulateStateTaxResponse(params: TaxApiRequestParams): StateTaxResponse {
    const annualIncome = this.getAnnualizedIncome(params.income, params.payPeriod);
    const state = params.state?.toUpperCase();
    
    let stateTax = 0;
    let stateTaxRate = 0;
    let localTax = 0;
    let unemploymentInsurance = 0;
    let disabilityInsurance = 0;
    
    // Handle different states
    switch (state) {
      case 'TX':
      case 'TEXAS':
        // No state income tax in Texas
        stateTax = 0;
        stateTaxRate = 0;
        
        // Texas does have unemployment insurance paid by employers
        unemploymentInsurance = 0; // Not deducted from employee wages
        break;
        
      case 'CA':
      case 'CALIFORNIA':
        // California has progressive state tax
        if (params.filingStatus.toLowerCase().includes('single')) {
          if (annualIncome <= 10099) {
            stateTax = annualIncome * 0.01;
          } else if (annualIncome <= 23942) {
            stateTax = 101 + (annualIncome - 10099) * 0.02;
          } else if (annualIncome <= 37788) {
            stateTax = 378 + (annualIncome - 23942) * 0.04;
          } else if (annualIncome <= 52455) {
            stateTax = 932 + (annualIncome - 37788) * 0.06;
          } else if (annualIncome <= 66295) {
            stateTax = 1812 + (annualIncome - 52455) * 0.08;
          } else if (annualIncome <= 338639) {
            stateTax = 2919 + (annualIncome - 66295) * 0.093;
          } else if (annualIncome <= 406364) {
            stateTax = 28246 + (annualIncome - 338639) * 0.103;
          } else if (annualIncome <= 677275) {
            stateTax = 35211 + (annualIncome - 406364) * 0.113;
          } else {
            stateTax = 65835 + (annualIncome - 677275) * 0.123;
          }
        } else {
          // Married filing jointly (simplified)
          if (annualIncome <= 20198) {
            stateTax = annualIncome * 0.01;
          } else if (annualIncome <= 47884) {
            stateTax = 202 + (annualIncome - 20198) * 0.02;
          } else {
            // Simplified for demo purposes
            stateTax = 756 + (annualIncome - 47884) * 0.06;
          }
        }
        
        stateTaxRate = stateTax / annualIncome;
        disabilityInsurance = annualIncome * 0.009; // CA SDI rate
        
        // Adjust to pay period
        stateTax = this.adjustAmountForPayPeriod(stateTax, params.payPeriod);
        disabilityInsurance = this.adjustAmountForPayPeriod(disabilityInsurance, params.payPeriod);
        break;
        
      case 'NY':
      case 'NEW YORK':
        // New York has progressive state tax (simplified)
        stateTax = annualIncome * 0.0525; // Average tax rate for demo
        stateTaxRate = 0.0525;
        
        // NYC local tax if applicable (simplified)
        if (params.additionalWithholding) { // Using this field as a proxy for NYC residence
          localTax = annualIncome * 0.035;
        }
        
        // Adjust to pay period
        stateTax = this.adjustAmountForPayPeriod(stateTax, params.payPeriod);
        localTax = this.adjustAmountForPayPeriod(localTax, params.payPeriod);
        break;
        
      default:
        // Default modest state tax for demo
        stateTax = annualIncome * 0.03;
        stateTaxRate = 0.03;
        
        // Adjust to pay period
        stateTax = this.adjustAmountForPayPeriod(stateTax, params.payPeriod);
    }
    
    return {
      stateTax,
      stateTaxRate,
      localTax: localTax > 0 ? localTax : undefined,
      unemploymentInsurance: unemploymentInsurance > 0 ? unemploymentInsurance : undefined,
      disabilityInsurance: disabilityInsurance > 0 ? disabilityInsurance : undefined,
      effectiveDate: new Date().toISOString()
    };
  }
  
  /**
   * Convert pay period amount to annual amount
   */
  private getAnnualizedIncome(amount: number, payPeriod: string): number {
    const period = payPeriod.toLowerCase();
    
    if (period.includes('weekly')) {
      return amount * 52;
    } else if (period.includes('bi-weekly') || period.includes('biweekly')) {
      return amount * 26;
    } else if (period.includes('semi-monthly') || period.includes('semimonthly')) {
      return amount * 24;
    } else if (period.includes('monthly')) {
      return amount * 12;
    } else if (period.includes('quarterly')) {
      return amount * 4;
    } else if (period.includes('annual')) {
      return amount;
    }
    
    // Default to bi-weekly if unspecified
    return amount * 26;
  }
  
  /**
   * Adjust annual amount to pay period amount
   */
  private adjustAmountForPayPeriod(annualAmount: number, payPeriod: string): number {
    const period = payPeriod.toLowerCase();
    
    if (period.includes('weekly')) {
      return annualAmount / 52;
    } else if (period.includes('bi-weekly') || period.includes('biweekly')) {
      return annualAmount / 26;
    } else if (period.includes('semi-monthly') || period.includes('semimonthly')) {
      return annualAmount / 24;
    } else if (period.includes('monthly')) {
      return annualAmount / 12;
    } else if (period.includes('quarterly')) {
      return annualAmount / 4;
    } else if (period.includes('annual')) {
      return annualAmount;
    }
    
    // Default to bi-weekly if unspecified
    return annualAmount / 26;
  }
}

// Create and export a default instance
export const taxApiClient = new ExternalTaxApiClient();

export default taxApiClient;
