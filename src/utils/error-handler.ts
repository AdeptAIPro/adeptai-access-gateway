
/**
 * Error handling utilities for AWS backend integration
 */

export enum ErrorType {
  API = 'API_ERROR',
  VALIDATION = 'VALIDATION_ERROR',
  AUTHENTICATION = 'AUTHENTICATION_ERROR',
  AUTHORIZATION = 'AUTHORIZATION_ERROR',
  NOT_FOUND = 'NOT_FOUND_ERROR',
  TIMEOUT = 'TIMEOUT_ERROR',
  NETWORK = 'NETWORK_ERROR',
  UNKNOWN = 'UNKNOWN_ERROR',
  SERVER = 'SERVER_ERROR',
  DATA_ENCRYPTION = 'DATA_ENCRYPTION_ERROR',
  INFRASTRUCTURE = 'INFRASTRUCTURE_ERROR',
  SECURITY = 'SECURITY_ERROR'
}

export interface AppError {
  message: string;
  type: ErrorType;
  originalError?: any;
  userFriendlyMessage: string;
  metadata?: Record<string, any>;
}

/**
 * Create a standardized application error
 */
export function createAppError(
  message: string, 
  type: ErrorType = ErrorType.UNKNOWN, 
  originalError?: any,
  metadata?: Record<string, any>
): AppError {
  // Create user-friendly message based on error type
  let userFriendlyMessage = "An unexpected error occurred. Please try again.";
  
  switch (type) {
    case ErrorType.API:
      userFriendlyMessage = "We're having trouble connecting to our services. Please try again later.";
      break;
    case ErrorType.VALIDATION:
      userFriendlyMessage = "Please check your input and try again.";
      break;
    case ErrorType.AUTHENTICATION:
      userFriendlyMessage = "Your session has expired. Please log in again.";
      break;
    case ErrorType.AUTHORIZATION:
      userFriendlyMessage = "You don't have permission to perform this action.";
      break;
    case ErrorType.NOT_FOUND:
      userFriendlyMessage = "The requested resource was not found.";
      break;
    case ErrorType.TIMEOUT:
      userFriendlyMessage = "The request timed out. Please try again.";
      break;
    case ErrorType.NETWORK:
      userFriendlyMessage = "Network error. Please check your connection and try again.";
      break;
  }
  
  return {
    message,
    type,
    originalError,
    userFriendlyMessage,
    metadata
  };
}

/**
 * Handle errors with optional toast notification
 */
export function handleError(error: any, showToast: boolean = true): AppError {
  // Convert to AppError if it isn't already
  const appError: AppError = error.type ? 
    error as AppError : 
    createAppError(
      error.message || "Unknown error", 
      ErrorType.UNKNOWN, 
      error
    );
  
  // Log error for debugging
  console.error(`[${appError.type}]`, appError.message, {
    originalError: appError.originalError,
    metadata: appError.metadata
  });
  
  // Show toast if requested
  if (showToast) {
    // Import dynamically to avoid circular dependencies
    import("@/hooks/use-toast").then(({ toast }) => {
      toast({
        title: "Error",
        description: appError.userFriendlyMessage,
        variant: "destructive",
      });
    }).catch(() => {
      // Fallback if toast is not available
      console.error("Failed to show toast notification");
    });
  }
  
  return appError;
}

/**
 * Try/catch wrapper for async functions
 */
export async function tryCatch<T>(
  fn: () => Promise<T>
): Promise<[T | null, AppError | null]> {
  try {
    const result = await fn();
    return [result, null];
  } catch (error) {
    const appError = error.type ? 
      error as AppError : 
      createAppError(
        error.message || "Unknown error", 
        ErrorType.UNKNOWN, 
        error
      );
    return [null, appError];
  }
}
