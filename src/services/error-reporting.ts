
/**
 * Service for centralized error reporting to backend
 */

import { ErrorType } from "@/utils/error-handler";
import { lambdaApi } from "./backend-api/LambdaApiClient";
import { ERROR_REPORTING_LAMBDA } from "./aws/config";

/**
 * Report an API error to our monitoring service
 */
export const reportApiError = async (
  functionName: string,
  error: any,
  context: Record<string, any> = {}
): Promise<void> => {
  try {
    // Extract useful information from error
    const errorInfo = {
      functionName,
      errorMessage: error.message || "Unknown error",
      errorType: error.type || ErrorType.UNKNOWN,
      timestamp: new Date().toISOString(),
      context,
      stack: error.originalError?.stack,
      metadata: error.metadata || {}
    };
    
    console.error("API Error:", errorInfo);
    
    // In development, just log to console
    if (import.meta.env.DEV) {
      return;
    }
    
    // In production, report to backend
    await lambdaApi.invoke(
      ERROR_REPORTING_LAMBDA,
      'logError',
      errorInfo
    );
  } catch (reportingError) {
    // Don't let error reporting failures cause issues
    console.error("Failed to report error:", reportingError);
  }
};
