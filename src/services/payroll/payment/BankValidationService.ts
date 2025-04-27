
import { BankAccount } from "@/types/employee";
import { toast } from "@/hooks/use-toast";

/**
 * Bank validation result
 */
interface BankValidationResult {
  valid: boolean;
  errors: string[];
  bankName?: string;
  accountType?: string;
}

/**
 * Service for validating bank accounts for direct deposit
 */
export class BankValidationService {
  // US Bank routing numbers are 9 digits
  private static readonly ROUTING_NUMBER_REGEX = /^\d{9}$/;
  
  // List of common bank routing numbers for validation
  // In a real system, this would connect to a routing number database
  private static readonly KNOWN_ROUTING_NUMBERS: Record<string, string> = {
    '021000021': 'JPMorgan Chase',
    '026009593': 'Bank of America',
    '011401533': 'Bank of America',
    '121000248': 'Wells Fargo',
    '122105155': 'Wells Fargo',
    '031302955': 'Citibank',
    '036001808': 'Capital One',
    '021001088': 'HSBC',
    '111000614': 'PNC Bank',
    '061000052': 'US Bank',
    '091000019': 'Goldman Sachs',
    '103100195': 'USAA',
    '253177049': 'Frost Bank' // Texas bank
  };

  /**
   * Validates a bank account for direct deposit
   */
  static async validateBankAccount(account: BankAccount): Promise<BankValidationResult> {
    const errors: string[] = [];
    
    // Validate routing number format
    if (!this.ROUTING_NUMBER_REGEX.test(account.routingNumber)) {
      errors.push('Routing number must be 9 digits');
    }
    
    // Check routing number checksum
    if (!this.validateRoutingChecksum(account.routingNumber)) {
      errors.push('Invalid routing number checksum');
    }
    
    // Validate account number format
    if (!/^\d{4,17}$/.test(account.accountNumber)) {
      errors.push('Account number must be between 4 and 17 digits');
    }
    
    // In a real system, we would validate the account via API
    // Here we'll just lookup the bank name from our known list
    let bankName = this.KNOWN_ROUTING_NUMBERS[account.routingNumber] || account.bankName;
    
    if (!bankName && errors.length === 0) {
      // Simulate API call to lookup bank name
      try {
        bankName = await this.lookupBankByRouting(account.routingNumber);
      } catch (error) {
        console.error('Error looking up bank by routing number:', error);
      }
    }
    
    return {
      valid: errors.length === 0,
      errors,
      bankName,
      accountType: account.accountType
    };
  }
  
  /**
   * Validates the bank routing number using checksum
   * Using the ABA routing number validation algorithm
   */
  private static validateRoutingChecksum(routing: string): boolean {
    if (!this.ROUTING_NUMBER_REGEX.test(routing)) {
      return false;
    }
    
    // ABA routing number checksum calculation
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      let digit = parseInt(routing.charAt(i));
      if (i % 3 === 0) {
        sum += digit * 3;
      } else if (i % 3 === 1) {
        sum += digit * 7;
      } else {
        sum += digit;
      }
    }
    
    return sum % 10 === 0;
  }
  
  /**
   * Lookup bank information by routing number
   * In a real system, this would call an actual banking API
   */
  private static async lookupBankByRouting(routing: string): Promise<string> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check our known list
    if (this.KNOWN_ROUTING_NUMBERS[routing]) {
      return this.KNOWN_ROUTING_NUMBERS[routing];
    }
    
    // Mock response for unknown routing numbers
    return 'Unknown Bank';
  }
  
  /**
   * Validates an employee's bank information for direct deposit
   * Returns true if valid, logs errors via toast if invalid
   */
  static async validateEmployeeBankInfo(employee: any): Promise<boolean> {
    try {
      if (!employee.bankAccount && (!employee.paymentAccounts || employee.paymentAccounts.length === 0)) {
        toast({
          title: "Bank Information Required",
          description: `Employee ${employee.firstName} ${employee.lastName} is missing bank account information for direct deposit.`,
          variant: "destructive",
        });
        return false;
      }
      
      // Check legacy bank account format
      if (employee.bankAccount) {
        const bankAccount: BankAccount = {
          bankName: employee.bankAccount.bankName || 'Unknown Bank',
          accountNumber: employee.bankAccount.accountNumber,
          routingNumber: employee.bankAccount.routingNumber,
          accountType: employee.bankAccount.accountType
        };
        
        const result = await this.validateBankAccount(bankAccount);
        
        if (!result.valid) {
          toast({
            title: "Invalid Bank Information",
            description: `Employee ${employee.firstName} ${employee.lastName}'s bank information has errors: ${result.errors.join(', ')}`,
            variant: "destructive",
          });
          return false;
        }
        
        return true;
      }
      
      // Check new payment accounts format
      if (employee.paymentAccounts && employee.paymentAccounts.length > 0) {
        const hasPrimary = employee.paymentAccounts.some((acct: PaymentDistribution) => acct.primary);
        if (!hasPrimary) {
          toast({
            title: "No Primary Bank Account",
            description: `Employee ${employee.firstName} ${employee.lastName} must have a primary bank account for direct deposit.`,
            variant: "destructive",
          });
          return false;
        }
        
        // Validate each bank account
        let allValid = true;
        for (const acct of employee.paymentAccounts) {
          const result = await this.validateBankAccount(acct.bankAccount);
          
          if (!result.valid) {
            toast({
              title: "Invalid Bank Information",
              description: `Employee ${employee.firstName} ${employee.lastName}'s bank account (${acct.bankAccount.accountNumber.slice(-4)}) has errors: ${result.errors.join(', ')}`,
              variant: "destructive",
            });
            allValid = false;
          }
        }
        
        return allValid;
      }
      
      return false;
    } catch (error) {
      console.error('Error validating employee bank info:', error);
      toast({
        title: "Bank Validation Error",
        description: "An error occurred while validating bank account information.",
        variant: "destructive",
      });
      return false;
    }
  }
}

export default BankValidationService;
