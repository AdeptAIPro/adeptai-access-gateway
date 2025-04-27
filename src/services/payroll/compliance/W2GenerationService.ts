
import { Employee } from "@/types/employee";
import { toast } from "@/hooks/use-toast";

export interface W2FormData {
  tax_year: number;
  employee: {
    ssn: string;
    first_name: string;
    last_name: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    }
  };
  employer: {
    ein: string;
    name: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    }
  };
  wages_tips: number;
  federal_tax_withheld: number;
  social_security_wages: number;
  social_security_tax_withheld: number;
  medicare_wages: number;
  medicare_tax_withheld: number;
  state_wages: number;
  state_tax_withheld: number;
  state_code: string;
  local_wages?: number;
  local_tax_withheld?: number;
  locality_name?: string;
}

export interface W2GenerationResult {
  success: boolean;
  w2_id?: string;
  file_url?: string;
  error?: string;
}

export interface ComplianceReportingOptions {
  year: number;
  quarter?: 1 | 2 | 3 | 4;
  reportType: 
    | 'w2' 
    | '941' 
    | '940' 
    | 'state_withholding' 
    | 'state_unemployment' 
    | 'aca_1095c';
  format: 'pdf' | 'csv' | 'e-file';
  includeEmployerCopy?: boolean;
  includeStateCopy?: boolean;
}

/**
 * Service for generating W-2 forms and compliance reports
 */
export class W2GenerationService {
  // API configuration variables - these would be set from environment variables in production
  private static apiKey = "demo-key";
  private static apiEndpoint = "https://api.taxformgenerator.com/v1";
  private static useDemo = true; // Set to false in production
  
  /**
   * Generate a W-2 form for an employee
   */
  static async generateW2(
    employee: Employee, 
    yearData: any, 
    employerData: any
  ): Promise<W2GenerationResult> {
    try {
      console.log(`Generating W-2 form for ${employee.firstName} ${employee.lastName} for tax year ${yearData.year}`);
      
      // Validate required data
      if (!this.validateW2Data(employee, yearData, employerData)) {
        return { 
          success: false, 
          error: "Missing required data for W-2 generation" 
        };
      }
      
      // Prepare W-2 form data
      const formData: W2FormData = {
        tax_year: yearData.year,
        employee: {
          ssn: employee.taxInfo?.ssn || "000-00-0000",
          first_name: employee.firstName,
          last_name: employee.lastName,
          address: this.formatAddress(employee.address)
        },
        employer: {
          ein: employerData.ein || "00-0000000",
          name: employerData.name || "Company Name",
          address: {
            street: employerData.address?.street || "123 Main St",
            city: employerData.address?.city || "Anytown",
            state: employerData.address?.state || "CA",
            zip: employerData.address?.zip || "90210"
          }
        },
        wages_tips: yearData.wages || 0,
        federal_tax_withheld: yearData.federalWithholding || 0,
        social_security_wages: yearData.socialSecurityWages || 0,
        social_security_tax_withheld: yearData.socialSecurityWithholding || 0,
        medicare_wages: yearData.medicareWages || 0,
        medicare_tax_withheld: yearData.medicareWithholding || 0,
        state_wages: yearData.stateWages || 0,
        state_tax_withheld: yearData.stateWithholding || 0,
        state_code: this.getStateCode(employee.address)
      };
      
      // Add local tax information if available
      if (yearData.localWages) {
        formData.local_wages = yearData.localWages;
        formData.local_tax_withheld = yearData.localWithholding || 0;
        formData.locality_name = yearData.localityName || "";
      }
      
      // In demo mode, simulate a successful response
      if (this.useDemo) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        return {
          success: true,
          w2_id: `W2-${employee.id}-${yearData.year}`,
          file_url: `https://example.com/w2/${employee.id}/${yearData.year}/w2.pdf`
        };
      }
      
      // In production, call the actual API
      // const response = await fetch(`${this.apiEndpoint}/w2/generate`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${this.apiKey}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(formData)
      // });
      
      // const result = await response.json();
      
      // return {
      //   success: response.ok,
      //   w2_id: result.w2_id,
      //   file_url: result.file_url,
      //   error: !response.ok ? result.error : undefined
      // };
      
      // Placeholder for API call (remove in production)
      return {
        success: true,
        w2_id: `W2-${employee.id}-${yearData.year}`,
        file_url: `https://example.com/w2/${employee.id}/${yearData.year}/w2.pdf`
      };
    } catch (error) {
      console.error("Error generating W-2:", error);
      
      toast({
        title: "W-2 Generation Failed",
        description: `Could not generate W-2 form for ${employee.firstName} ${employee.lastName}. ${error}`,
        variant: "destructive",
      });
      
      return {
        success: false,
        error: `W-2 generation error: ${error}`
      };
    }
  }
  
  /**
   * Generate compliance reports for regulatory filing
   */
  static async generateComplianceReport(
    employees: Employee[],
    options: ComplianceReportingOptions,
    employerData: any
  ): Promise<{ success: boolean; file_url?: string; error?: string }> {
    try {
      console.log(`Generating ${options.reportType} report for ${options.year} ${options.quarter ? `Q${options.quarter}` : ''}`);
      
      // Validate employer data
      if (!employerData.ein) {
        return { 
          success: false, 
          error: "Missing employer EIN required for compliance reporting" 
        };
      }
      
      // In demo mode, simulate a successful response
      if (this.useDemo) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        return {
          success: true,
          file_url: `https://example.com/compliance/${options.reportType}_${options.year}${options.quarter ? `_Q${options.quarter}` : ''}.${options.format}`
        };
      }
      
      // In production, this would call the actual API
      // Implementation would vary based on report type
      
      return {
        success: true,
        file_url: `https://example.com/compliance/${options.reportType}_${options.year}${options.quarter ? `_Q${options.quarter}` : ''}.${options.format}`
      };
    } catch (error) {
      console.error(`Error generating ${options.reportType} report:`, error);
      
      toast({
        title: "Compliance Report Failed",
        description: `Could not generate ${options.reportType.toUpperCase()} report. ${error}`,
        variant: "destructive",
      });
      
      return {
        success: false,
        error: `Compliance report generation error: ${error}`
      };
    }
  }
  
  /**
   * Validate required data for W-2 generation
   */
  private static validateW2Data(
    employee: Employee, 
    yearData: any, 
    employerData: any
  ): boolean {
    // Check employee data
    if (!employee.firstName || !employee.lastName) {
      console.error("Missing employee name");
      return false;
    }
    
    // Check for SSN
    if (!employee.taxInfo?.ssn) {
      console.error("Missing employee SSN");
      return false;
    }
    
    // Check for address
    if (!employee.address) {
      console.error("Missing employee address");
      return false;
    }
    
    // Check for wages
    if (!yearData || yearData.wages === undefined) {
      console.error("Missing wage data");
      return false;
    }
    
    // Check for employer data
    if (!employerData || !employerData.ein) {
      console.error("Missing employer EIN");
      return false;
    }
    
    return true;
  }
  
  /**
   * Format address for W-2 form
   */
  private static formatAddress(address: any): { street: string; city: string; state: string; zip: string } {
    if (!address) {
      return { street: "", city: "", state: "", zip: "" };
    }
    
    if (typeof address === 'string') {
      // Parse string address - this is a simplified example
      const parts = address.split(',').map(p => p.trim());
      
      return {
        street: parts[0] || "",
        city: parts[1] || "",
        state: parts[2]?.split(' ')?.[0] || "",
        zip: parts[2]?.split(' ')?.[1] || ""
      };
    } else {
      // Address is an object
      return {
        street: address.street || "",
        city: address.city || "",
        state: address.state || "",
        zip: address.zipCode || ""
      };
    }
  }
  
  /**
   * Extract state code from address
   */
  private static getStateCode(address: any): string {
    if (!address) return "";
    
    if (typeof address === 'string') {
      // Extract state from string address - simplified
      const stateZipMatch = address.match(/([A-Z]{2})\s+\d{5}/);
      return stateZipMatch?.[1] || "";
    } else {
      // Address is an object
      return address.state || "";
    }
  }
  
  /**
   * Check if W-2 forms are ready to be generated
   * Used to verify year-end data completeness
   */
  static async verifyW2DataCompleteness(
    employees: Employee[],
    yearData: any,
    year: number
  ): Promise<{ ready: boolean; issues: string[] }> {
    const issues: string[] = [];
    
    // Check if we have all required data for each employee
    for (const employee of employees) {
      const employeeYearData = yearData[employee.id];
      
      if (!employeeYearData) {
        issues.push(`Missing yearly data for ${employee.firstName} ${employee.lastName}`);
        continue;
      }
      
      if (!employee.taxInfo?.ssn) {
        issues.push(`Missing SSN for ${employee.firstName} ${employee.lastName}`);
      }
      
      if (!employee.address) {
        issues.push(`Missing address for ${employee.firstName} ${employee.lastName}`);
      }
      
      if (employeeYearData.wages === undefined) {
        issues.push(`Missing wage data for ${employee.firstName} ${employee.lastName}`);
      }
    }
    
    return {
      ready: issues.length === 0,
      issues
    };
  }
}

export default W2GenerationService;
