
import { Employee, TimeTracking } from "@/types/employee";
import { toast } from "@/hooks/use-toast";

export interface OvertimeRules {
  country: string;
  state?: string;
  standardHoursPerWeek: number;
  overtimeRate: number;
  doubleTimeRate?: number;
  doubleTimeThreshold?: number; // Hours per day threshold for double time
  requiresDoubleTimeOnWeekends?: boolean; // Some states require double time on weekends
  requiresOvertimeAfterDailyThreshold?: boolean; // Some states require overtime after X hours in a day
  dailyOvertimeThreshold?: number; // Hours per day before overtime
}

export interface TimeCalculationResult {
  regularHours: number;
  overtimeHours: number;
  doubleTimeHours: number;
  regularPay: number;
  overtimePay: number;
  doubleTimePay: number;
  totalPay: number;
}

// Overtime rules by country and state
const OVERTIME_RULES: Record<string, OvertimeRules> = {
  "USA": {
    country: "USA",
    standardHoursPerWeek: 40,
    overtimeRate: 1.5,
  },
  "USA:California": {
    country: "USA",
    state: "California",
    standardHoursPerWeek: 40,
    overtimeRate: 1.5,
    doubleTimeRate: 2.0,
    doubleTimeThreshold: 12, // Double time after 12 hours in a day
    requiresOvertimeAfterDailyThreshold: true,
    dailyOvertimeThreshold: 8, // Overtime after 8 hours in a day
  },
  "USA:Texas": {
    country: "USA",
    state: "Texas",
    standardHoursPerWeek: 40,
    overtimeRate: 1.5,
    // Texas follows federal overtime rules
  }
};

/**
 * Service for calculating time and overtime based on FLSA and state regulations
 */
export class TimeTrackingService {
  /**
   * Calculate pay based on time tracking data
   */
  static calculatePay(
    employee: Employee,
    timeTracking: TimeTracking,
    payRate: number
  ): TimeCalculationResult {
    try {
      // Get appropriate overtime rules
      const rules = this.getOvertimeRules(employee);
      
      // Calculate regular, overtime, and double time hours
      const regularHours = timeTracking.regularHours;
      const overtimeHours = timeTracking.overtimeHours;
      const doubleTimeHours = timeTracking.doubleTimeHours || 0;
      
      // Calculate pay amounts
      const regularPay = regularHours * payRate;
      const overtimePay = overtimeHours * payRate * rules.overtimeRate;
      const doubleTimePay = doubleTimeHours * payRate * (rules.doubleTimeRate || 2.0);
      
      // Calculate total pay
      const totalPay = regularPay + overtimePay + doubleTimePay;
      
      return {
        regularHours,
        overtimeHours,
        doubleTimeHours,
        regularPay,
        overtimePay,
        doubleTimePay,
        totalPay
      };
    } catch (error) {
      console.error("Error calculating pay based on time tracking:", error);
      toast({
        title: "Time Calculation Error",
        description: "Error calculating hours and pay. Using regular hours only.",
        variant: "destructive",
      });
      
      // Fallback to regular hours only
      const regularPay = timeTracking.regularHours * payRate;
      
      return {
        regularHours: timeTracking.regularHours,
        overtimeHours: 0,
        doubleTimeHours: 0,
        regularPay,
        overtimePay: 0,
        doubleTimePay: 0,
        totalPay: regularPay
      };
    }
  }
  
  /**
   * Get overtime rules based on employee location
   */
  static getOvertimeRules(employee: Employee): OvertimeRules {
    let country = "USA";
    let state = "";
    
    // Determine country and state from employee address
    if (employee.address) {
      if (typeof employee.address === 'string') {
        if (employee.address.includes("India")) {
          country = "India";
        }
        
        if (employee.address.includes("California") || employee.address.includes("CA")) {
          state = "California";
        } else if (employee.address.includes("Texas") || employee.address.includes("TX")) {
          state = "Texas";
        }
      } else {
        state = employee.address.state;
        if (state === "CA") state = "California";
        if (state === "TX") state = "Texas";
      }
    }
    
    const ruleKey = state ? `${country}:${state}` : country;
    return OVERTIME_RULES[ruleKey] || OVERTIME_RULES["USA"];
  }
  
  /**
   * Calculate overtime and double time hours from daily time entries
   */
  static calculateOvertimeFromDailyEntries(
    dailyHours: number[],
    employee: Employee
  ): { regular: number; overtime: number; doubleTime: number } {
    // Get rules for this employee's location
    const rules = this.getOvertimeRules(employee);
    
    let regularHours = 0;
    let overtimeHours = 0;
    let doubleTimeHours = 0;
    
    // Calculate daily overtime and double time if required by state rules
    if (rules.requiresOvertimeAfterDailyThreshold) {
      dailyHours.forEach(hoursWorked => {
        if (hoursWorked <= rules.dailyOvertimeThreshold!) {
          // All hours are regular
          regularHours += hoursWorked;
        } else if (rules.doubleTimeThreshold && hoursWorked > rules.doubleTimeThreshold) {
          // Some hours are double time
          regularHours += rules.dailyOvertimeThreshold!;
          overtimeHours += (rules.doubleTimeThreshold - rules.dailyOvertimeThreshold!);
          doubleTimeHours += (hoursWorked - rules.doubleTimeThreshold);
        } else {
          // Some hours are overtime
          regularHours += rules.dailyOvertimeThreshold!;
          overtimeHours += (hoursWorked - rules.dailyOvertimeThreshold!);
        }
      });
    } else {
      // Use weekly calculation
      const totalHoursWorked = dailyHours.reduce((sum, hours) => sum + hours, 0);
      
      if (totalHoursWorked <= rules.standardHoursPerWeek) {
        regularHours = totalHoursWorked;
      } else {
        regularHours = rules.standardHoursPerWeek;
        overtimeHours = totalHoursWorked - rules.standardHoursPerWeek;
      }
    }
    
    return { regular: regularHours, overtime: overtimeHours, doubleTime: doubleTimeHours };
  }
  
  /**
   * Validate time tracking data for an employee
   */
  static validateTimeTracking(timeTracking: TimeTracking): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Check for negative hours
    if (timeTracking.regularHours < 0) {
      errors.push("Regular hours cannot be negative");
    }
    
    if (timeTracking.overtimeHours < 0) {
      errors.push("Overtime hours cannot be negative");
    }
    
    if (timeTracking.doubleTimeHours !== undefined && timeTracking.doubleTimeHours < 0) {
      errors.push("Double time hours cannot be negative");
    }
    
    // Check for unrealistic values (e.g., more than 24 hours in a day for a pay period)
    const payPeriodDays = 14; // Assuming bi-weekly pay period
    const maxRealisticHours = payPeriodDays * 16; // Maximum 16 hours per day
    
    const totalHours = timeTracking.regularHours + 
      timeTracking.overtimeHours + 
      (timeTracking.doubleTimeHours || 0) +
      (timeTracking.paidTimeOff || 0) +
      (timeTracking.sickTime || 0) +
      (timeTracking.holidayHours || 0);
    
    if (totalHours > maxRealisticHours) {
      errors.push(`Total hours (${totalHours}) exceeds realistic maximum (${maxRealisticHours}) for the pay period`);
    }
    
    return { valid: errors.length === 0, errors };
  }
}

export default TimeTrackingService;
