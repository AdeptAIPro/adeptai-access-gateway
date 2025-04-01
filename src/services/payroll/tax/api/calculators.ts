
/**
 * Tax rate calculation utilities
 */

/**
 * Calculate federal tax rate for USA based on income and filing status
 * This is a simplified calculation for demonstration purposes
 */
export const calculateUSFederalTaxRate = (income: number, filingStatus: string): number => {
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
export const calculateIndiaIncomeTaxRate = (income: number): number => {
  // Simplified tax slabs in INR
  if (income <= 250000) return 0;
  if (income <= 500000) return 0.05;
  if (income <= 750000) return 0.10;
  if (income <= 1000000) return 0.15;
  if (income <= 1250000) return 0.20;
  if (income <= 1500000) return 0.25;
  return 0.30;
};
