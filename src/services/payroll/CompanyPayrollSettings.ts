
export interface CompanyPayrollSettings {
  companyId: string;
  payFrequency: 'weekly' | 'biweekly' | 'monthly' | 'semimonthly';
  payrollProcessingDay: number;
  defaultWithholding: number;
  taxSettings: {
    federalTaxId?: string;
    stateTaxId?: string;
    useAutomaticTaxCalculation: boolean;
  };
  directDepositEnabled: boolean;
  approvalWorkflow: {
    requireApproval: boolean;
    approverIds: string[];
  };
}

export const DEFAULT_PAYROLL_SETTINGS: CompanyPayrollSettings = {
  companyId: '',
  payFrequency: 'biweekly',
  payrollProcessingDay: 5, // Process payroll on the 5th day (or the 5th day of the pay period)
  defaultWithholding: 15, // 15% default withholding
  taxSettings: {
    useAutomaticTaxCalculation: true,
  },
  directDepositEnabled: true,
  approvalWorkflow: {
    requireApproval: false,
    approverIds: [],
  },
};

export const getCompanyPayrollSettings = async (companyId: string): Promise<CompanyPayrollSettings> => {
  // In a real implementation, this would fetch settings from a database
  // For now, return the default settings with the provided company ID
  return {
    ...DEFAULT_PAYROLL_SETTINGS,
    companyId,
  };
};

export const updateCompanyPayrollSettings = async (settings: Partial<CompanyPayrollSettings>): Promise<CompanyPayrollSettings> => {
  // In a real implementation, this would update settings in a database
  // For now, just return the merged settings
  return {
    ...DEFAULT_PAYROLL_SETTINGS,
    ...settings,
  };
};
