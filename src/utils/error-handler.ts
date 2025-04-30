
/**
 * Centralized error handling utility
 * 
 * This provides consistent error handling and reporting across the application
 */

import { toast } from 'sonner';
import { AppError } from './errors/AppError';
import { ErrorType } from './errors/types';

// Re-export AppError and related types from the errors directory 
export { AppError } from './errors/AppError';
export { ErrorType } from './errors/types';
export { tryCatch } from './errors/handlers';

export interface ErrorHandlerParams {
  type: ErrorType;
  message: string;
  userFriendlyMessage?: string;
  originalError?: any;
  metadata?: Record<string, any>;
}

/**
 * Centralized error handler function
 * 
 * @param params Error parameters
 * @param showToast Whether to show a toast notification
 */
export const handleError = (params: ErrorHandlerParams | Error, showToast: boolean = false): AppError => {
  // Handle case where an Error object is passed directly
  if (params instanceof Error) {
    const errorParams = {
      type: ErrorType.UNKNOWN,
      message: params.message,
      originalError: params
    } as ErrorHandlerParams;
    params = errorParams;
  }

  // Extract parameters
  const { type, message, userFriendlyMessage, originalError, metadata } = params as ErrorHandlerParams;
  
  // Log error details to console
  console.error(`${type}: ${message}`, {
    originalError,
    metadata
  });
  
  // Show toast notification if requested
  if (showToast) {
    toast({
      title: type,
      description: userFriendlyMessage || message,
      variant: "destructive",
    });
  }

  // Create an AppError for consistent error handling
  const appError = createAppError(message, type, originalError);
  
  return appError;
};

/**
 * Create a properly formatted AppError instance
 */
export const createAppError = (
  message: string,
  type: ErrorType = ErrorType.UNKNOWN,
  originalError?: any,
  context?: Record<string, any>
): AppError => {
  return new AppError({
    message,
    type,
    userFriendlyMessage: getDefaultUserFriendlyMessage(type, message),
    originalError,
    context
  });
};

/**
 * Get a default user-friendly message based on error type
 */
function getDefaultUserFriendlyMessage(type: ErrorType, originalMessage: string): string {
  switch (type) {
    case ErrorType.NETWORK:
      return 'Network error. Please check your connection and try again.';
    case ErrorType.AUTHENTICATION:
      return 'Authentication error. Please log in again.';
    case ErrorType.API:
      return 'Operation failed. Please try again later.';
    default:
      // Use original message if relatively short and doesn't contain technical details
      if (originalMessage.length < 100 && !originalMessage.includes('Exception') && !originalMessage.includes('Error:')) {
        return originalMessage;
      }
      return 'An unexpected error occurred. Please try again.';
  }
}

/**
 * Report an API error with consistent formatting
 */
export const reportApiError = (
  endpoint: string,
  error: any,
  requestData?: any
): void => {
  handleError({
    type: ErrorType.API,
    message: `API error calling ${endpoint}`,
    userFriendlyMessage: 'Operation failed. Please try again later.',
    originalError: error,
    metadata: { endpoint, requestData }
  }, true);
};

/**
 * Handle unauthorized error (e.g., expired token)
 */
export const handleUnauthorizedError = (): void => {
  // Clear authentication state
  localStorage.removeItem('auth_token');
  
  // Show toast
  toast({
    title: "Session Expired",
    description: "Your session has expired. Please log in again.",
    variant: "destructive",
  });
  
  // Redirect to login page
  window.location.href = '/login';
};

/**
 * Create a safe wrapper for async functions
 * 
 * This provides a standardized way to handle errors in async functions
 */
export const createSafeAsync = <T, A extends any[]>(
  fn: (...args: A) => Promise<T>,
  errorType: ErrorType = ErrorType.UNKNOWN
) => {
  return async (...args: A): Promise<T | null> => {
    try {
      return await fn(...args);
    } catch (error) {
      handleError({
        type: errorType,
        message: `Error in async function: ${fn.name}`,
        originalError: error
      }, true);
      return null;
    }
  };
};
