
/**
 * Utility functions for payroll calculations
 */

/**
 * Calculate hours per pay period based on frequency
 */
export const calculateHoursPerPeriod = (
  payFrequency: "Weekly" | "Bi-Weekly" | "Monthly" | "Semi-Monthly"
): number => {
  switch (payFrequency) {
    case "Weekly":
      return 40;
    case "Bi-Weekly":
      return 80;
    case "Semi-Monthly":
      return 86.67;
    case "Monthly":
      return 173.33;
    default:
      return 0;
  }
};

/**
 * Determine overall payroll status based on processing results
 */
export const determinePayrollStatus = (
  processedEmployees: number, 
  failedPayments: number
): "Completed" | "Partial" | "Failed" => {
  if (processedEmployees === 0) {
    return "Failed";
  } else if (failedPayments > 0) {
    return "Partial";
  } else {
    return "Completed";
  }
};
