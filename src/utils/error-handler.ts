
import { toast } from 'sonner';

export enum ErrorType {
  API = 'API',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  DATABASE = 'DATABASE',
  NETWORK = 'NETWORK',
  VALIDATION = 'VALIDATION',
  UNKNOWN = 'UNKNOWN',
  AWS = 'AWS',
  CONFIGURATION = 'CONFIGURATION',
  DATA_PROCESSING = 'DATA_PROCESSING',
  DATA_ENCRYPTION = 'DATA_ENCRYPTION',
  DEPLOYMENT = 'DEPLOYMENT',
  CI_CD = 'CI_CD',
  INFRASTRUCTURE = 'INFRASTRUCTURE'
}

export interface ErrorDetails {
  type: ErrorType;
  message: string;
  userFriendlyMessage?: string;
  originalError?: any;
  context?: Record<string, any>;
}

// Generic error handler that can be used throughout the application
export const handleError = (errorDetails: ErrorDetails, showToast: boolean = true): void => {
  const {
    type,
    message,
    userFriendlyMessage,
    originalError,
    context
  } = errorDetails;
  
  // Determine if this is a critical error
  const isCritical = [
    ErrorType.DATABASE,
    ErrorType.AUTHENTICATION,
    ErrorType.AWS,
    ErrorType.DEPLOYMENT,
    ErrorType.INFRASTRUCTURE
  ].includes(type);
  
  // Log the error with additional context for debugging
  const logMessage = `[${type}] ${message}`;
  if (isCritical) {
    console.error(logMessage, { originalError, context });
  } else {
    console.warn(logMessage, { originalError, context });
  }
  
  // Show user-friendly toast message if requested
  if (showToast) {
    const toastMessage = userFriendlyMessage || 
      'An error occurred. Please try again or contact support.';
    
    // Critical errors get a different toast style
    if (isCritical) {
      toast.error(toastMessage, {
        duration: 5000,
        description: type === ErrorType.NETWORK ? 'Check your internet connection' : undefined
      });
    } else {
      toast.warning(toastMessage, {
        duration: 3000
      });
    }
  }
  
  // For specific error types, take additional action
  switch (type) {
    case ErrorType.AUTHENTICATION:
      // Could redirect to login page or clear invalid tokens
      break;
    case ErrorType.AWS:
      // Could trigger AWS credential refresh or fall back to demo mode
      break;
    case ErrorType.DEPLOYMENT:
    case ErrorType.CI_CD:
    case ErrorType.INFRASTRUCTURE:
      // Log additional details for ops monitoring
      console.info('[OPERATIONS] Infrastructure or deployment issue detected', {
        timestamp: new Date().toISOString(),
        error: message,
        context
      });
      break;
    default:
      // No specific action needed
      break;
  }
  
  // Return error for potential further handling
  return;
};

// Utility for handling API errors with appropriate status code handling
export const handleApiError = (error: any): void => {
  let errorType = ErrorType.API;
  let userMessage = 'An API error occurred';
  
  // Determine error type and message based on HTTP status
  if (error.response) {
    const status = error.response.status;
    
    if (status === 401) {
      errorType = ErrorType.AUTHENTICATION;
      userMessage = 'Your session has expired. Please sign in again.';
    } else if (status === 403) {
      errorType = ErrorType.AUTHORIZATION;
      userMessage = 'You do not have permission to perform this action.';
    } else if (status === 404) {
      userMessage = 'The requested resource could not be found.';
    } else if (status >= 500) {
      userMessage = 'A server error occurred. Please try again later.';
    }
  } else if (error.request) {
    errorType = ErrorType.NETWORK;
    userMessage = 'Network error. Please check your connection.';
  }
  
  handleError({
    type: errorType,
    message: error.message || 'API request failed',
    userFriendlyMessage: userMessage,
    originalError: error
  }, true);
};

// Parse and handle AWS errors
export const handleAwsError = (error: any): void => {
  let userMessage = 'AWS operation failed';
  
  // Detect common AWS error patterns
  if (error.name === 'CredentialsProviderError' || 
      error.message?.includes('credentials')) {
    userMessage = 'AWS authentication failed. Please check your credentials.';
  } else if (error.name === 'ResourceNotFoundException') {
    userMessage = 'The requested AWS resource was not found.';
  } else if (error.name === 'AccessDenied' || 
             error.message?.includes('access denied') ||
             error.message?.includes('not authorized')) {
    userMessage = 'Access denied to AWS resource. Check your permissions.';
  }
  
  handleError({
    type: ErrorType.AWS,
    message: error.message || 'AWS error',
    userFriendlyMessage: userMessage,
    originalError: error
  }, true);
};

// Handle deployment and CI/CD errors
export const handleDeploymentError = (error: any, stage: string): void => {
  handleError({
    type: ErrorType.DEPLOYMENT,
    message: `Deployment failed at stage: ${stage}`,
    userFriendlyMessage: `Failed to deploy: ${stage} stage error`,
    originalError: error,
    context: { deploymentStage: stage }
  }, true);
};
