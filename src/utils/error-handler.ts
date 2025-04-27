
import { toast } from "sonner";

export enum ErrorType {
  API = "API_ERROR",
  NETWORK = "NETWORK_ERROR",
  AUTHENTICATION = "AUTHENTICATION_ERROR",
  AUTHORIZATION = "AUTHORIZATION_ERROR",
  VALIDATION = "VALIDATION_ERROR",
  NOT_FOUND = "NOT_FOUND_ERROR",
  SERVER = "SERVER_ERROR",
  PROCESSING = "PROCESSING_ERROR",
  UNKNOWN = "UNKNOWN_ERROR",
  SECURITY = "SECURITY_ERROR",
  DATA_ENCRYPTION = "DATA_ENCRYPTION_ERROR",
  INPUT_VALIDATION = "INPUT_VALIDATION_ERROR",
  RATE_LIMIT = "RATE_LIMIT_ERROR"
}

export interface AppError extends Error {
  type: ErrorType;
  userFriendlyMessage: string;
  originalError?: Error;
  context?: Record<string, any>;
}

interface GlobalErrorState {
  hasError: boolean;
  error: AppError | null;
  errorCount: Record<string, number>;
  lastErrorTime: Record<string, number>;
}

// Global state to track errors
const errorState: GlobalErrorState = {
  hasError: false,
  error: null,
  errorCount: {},
  lastErrorTime: {}
};

// Reset global error state
export const resetErrorState = () => {
  errorState.hasError = false;
  errorState.error = null;
};

// Get global error state
export const getErrorState = (): Readonly<GlobalErrorState> => ({ ...errorState });

// Create an AppError from any error
export const createAppError = (
  message: string, 
  type: ErrorType = ErrorType.UNKNOWN, 
  originalError?: any,
  context?: Record<string, any>
): AppError => {
  return {
    name: "AppError",
    type,
    message,
    userFriendlyMessage: getUserFriendlyMessage(type, message),
    originalError,
    context
  } as AppError;
};

// Handle error globally
export const handleError = (
  error: any,
  showToast: boolean = true,
  critical: boolean = false
): AppError => {
  // Convert to AppError if not already
  const appError: AppError = error && error.type 
    ? error as AppError 
    : createAppError(
        error?.message || "An unexpected error occurred",
        getErrorTypeFromError(error),
        error
      );

  // Set global error state for critical errors
  if (critical) {
    errorState.hasError = true;
    errorState.error = appError;
  }
  
  // Track error frequency
  const errorKey = `${appError.type}:${appError.message}`;
  errorState.errorCount[errorKey] = (errorState.errorCount[errorKey] || 0) + 1;
  errorState.lastErrorTime[errorKey] = Date.now();

  // Rate limiting for same error
  const sameErrorCount = errorState.errorCount[errorKey] || 0;
  const lastErrorTime = errorState.lastErrorTime[errorKey] || 0;
  const timeSinceLastError = Date.now() - lastErrorTime;
  
  // Only show toast if:
  // 1. Toast is requested
  // 2. Not the same error in quick succession (within 5 seconds)
  // 3. Not showing too many of the same error (max 3 within a minute)
  const showToastForThisError = showToast && 
    (timeSinceLastError > 5000 || errorKey !== errorState.error?.message) &&
    (sameErrorCount <= 3 || timeSinceLastError > 60000);
  
  // Show toast notification if appropriate
  if (showToastForThisError) {
    const toastOptions = getToastOptions(appError.type);
    
    // Show security errors with more prominence
    if (appError.type === ErrorType.SECURITY || 
        appError.type === ErrorType.DATA_ENCRYPTION ||
        appError.type === ErrorType.INPUT_VALIDATION) {
      toast.error(appError.userFriendlyMessage, {
        ...toastOptions,
        duration: 8000, // Show security warnings longer
      });
    } else {
      toast.error(appError.userFriendlyMessage, toastOptions);
    }
  }
  
  // Log to console with context info
  console.error(`[${appError.type}]`, appError.message, {
    userFriendlyMessage: appError.userFriendlyMessage,
    context: appError.context,
    originalError: appError.originalError
  });
  
  // For security issues, also log specifically for monitoring
  if (appError.type === ErrorType.SECURITY || 
      appError.type === ErrorType.DATA_ENCRYPTION ||
      appError.type === ErrorType.INPUT_VALIDATION) {
    console.error("[SECURITY ALERT]", appError);
    
    // In a production app, you would send this to your security monitoring system
  }
  
  return appError;
};

// Get user friendly message based on error type
const getUserFriendlyMessage = (type: ErrorType, message: string): string => {
  // For security issues, be careful with the messages - don't reveal too much
  switch (type) {
    case ErrorType.NETWORK:
      return "Unable to connect to the server. Please check your internet connection and try again.";
    case ErrorType.AUTHENTICATION:
      return "Your session has expired or is invalid. Please sign in again.";
    case ErrorType.AUTHORIZATION:
      return "You don't have permission to access this resource.";
    case ErrorType.VALIDATION:
      return message || "The submitted data was invalid. Please check your inputs and try again.";
    case ErrorType.NOT_FOUND:
      return "The requested resource could not be found.";
    case ErrorType.SERVER:
      return "We're experiencing technical difficulties. Our team has been notified.";
    case ErrorType.SECURITY:
      return "A security issue was detected. Please refresh the page and try again.";
    case ErrorType.DATA_ENCRYPTION:
      return "A data security issue was detected. Your data is safe, but please try again.";
    case ErrorType.INPUT_VALIDATION:
      return "Invalid input detected. Please check your data and try again.";
    case ErrorType.RATE_LIMIT:
      return "You've made too many requests. Please wait a moment and try again.";
    default:
      return message || "An unexpected error occurred. Please try again.";
  }
};

// Determine error type from various error objects
const getErrorTypeFromError = (error: any): ErrorType => {
  if (!error) return ErrorType.UNKNOWN;
  
  // Check for network errors
  if (error.name === 'NetworkError' || 
      error.message?.includes('network') || 
      error.message?.includes('connection')) {
    return ErrorType.NETWORK;
  }

  // Check for authorization errors
  if (error.status === 403 || 
      error.statusCode === 403 || 
      error.message?.includes('forbidden')) {
    return ErrorType.AUTHORIZATION;
  }

  // Check for authentication errors
  if (error.status === 401 || 
      error.statusCode === 401 || 
      error.message?.includes('unauthorized') || 
      error.message?.includes('unauthenticated')) {
    return ErrorType.AUTHENTICATION;
  }

  // Check for security issues
  if (error.message?.includes('security') || 
      error.message?.includes('xss') ||
      error.message?.includes('csrf') ||
      error.message?.includes('injection')) {
    return ErrorType.SECURITY;
  }

  // Check for validation errors
  if (error.status === 422 || 
      error.statusCode === 422 ||
      error.status === 400 || 
      error.statusCode === 400 || 
      error.name === 'ValidationError') {
    return ErrorType.VALIDATION;
  }

  // Default to unknown
  return ErrorType.UNKNOWN;
};

// Get toast options based on error type
const getToastOptions = (type: ErrorType) => {
  switch (type) {
    case ErrorType.SECURITY:
    case ErrorType.DATA_ENCRYPTION:
    case ErrorType.INPUT_VALIDATION:
      return {
        duration: 8000, // Show longer
        description: "This issue has been logged for security review."
      };
    case ErrorType.NETWORK:
      return {
        duration: 5000,
        description: "Check your internet connection"
      };
    case ErrorType.AUTHENTICATION:
      return {
        duration: 5000,
        description: "You will be redirected to login"
      };
    default:
      return {
        duration: 5000
      };
  }
};
