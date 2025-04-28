
export enum ErrorType {
  VALIDATION = 'VALIDATION',
  NETWORK = 'NETWORK',
  SERVER = 'SERVER',
  AUTH = 'AUTH',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  DATA_ENCRYPTION = 'DATA_ENCRYPTION',
  DATABASE = 'DATABASE',
  API = 'API',
  NOT_FOUND = 'NOT_FOUND',
  UNKNOWN = 'UNKNOWN'
}

export interface ErrorDetails {
  message: string;
  type: ErrorType;
  code?: string;
  data?: any;
  userFriendlyMessage?: string;
  originalError?: any;
  context?: Record<string, any>;
}

export class AppError extends Error {
  type: ErrorType;
  code?: string;
  data?: any;
  userFriendlyMessage: string;
  originalError?: any;
  context?: Record<string, any>;

  constructor({ message, type, code, data, userFriendlyMessage, originalError, context }: ErrorDetails) {
    super(message);
    this.type = type;
    this.code = code;
    this.data = data;
    this.userFriendlyMessage = userFriendlyMessage || message;
    this.originalError = originalError;
    this.context = context;
    
    // Ensure proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

/**
 * Create an AppError from error details
 */
export function createAppError(
  message: string,
  type: ErrorType = ErrorType.UNKNOWN,
  originalError?: any,
  context?: Record<string, any>
): AppError {
  return new AppError({
    message,
    type,
    userFriendlyMessage: getDefaultUserFriendlyMessage(type, message),
    originalError,
    context
  });
}

/**
 * Handle errors consistently across the application
 * 
 * @param error The error to handle
 * @param showToast Whether to show a toast notification
 * @returns The processed AppError
 */
export function handleError(error: unknown, showToast: boolean = false): AppError {
  const appError = convertToAppError(error);
  
  // Log the error
  console.error('[Error]:', appError.message, appError);
  
  if (showToast) {
    // You can use your preferred toast notification library here
    // For example: toast.error(appError.userFriendlyMessage);
    try {
      const { toast } = require('sonner');
      toast.error(appError.userFriendlyMessage);
    } catch (e) {
      console.error('Toast notification failed:', e);
    }
  }
  
  return appError;
}

/**
 * Convert any error to an AppError
 */
function convertToAppError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }
  
  if (error instanceof Error) {
    return new AppError({
      message: error.message,
      type: ErrorType.UNKNOWN,
      userFriendlyMessage: 'An unexpected error occurred',
      originalError: error
    });
  }
  
  // Handle case where error is an object with details
  if (typeof error === 'object' && error !== null) {
    const errorObj = error as Record<string, any>;
    
    return new AppError({
      message: errorObj.message || 'Unknown error occurred',
      type: determineErrorType(errorObj),
      userFriendlyMessage: errorObj.userFriendlyMessage || 'An error occurred',
      originalError: error
    });
  }
  
  // Fallback for primitive error values
  return new AppError({
    message: String(error),
    type: ErrorType.UNKNOWN,
    userFriendlyMessage: 'An unexpected error occurred'
  });
}

/**
 * Attempt to determine the error type from an error object
 */
function determineErrorType(errorObj: Record<string, any>): ErrorType {
  if (errorObj.type && Object.values(ErrorType).includes(errorObj.type)) {
    return errorObj.type as ErrorType;
  }
  
  const message = String(errorObj.message || '').toLowerCase();
  
  if (message.includes('network') || message.includes('offline')) {
    return ErrorType.NETWORK;
  }
  
  if (message.includes('auth') || message.includes('unauthorized') || message.includes('unauthenticated')) {
    return ErrorType.AUTHENTICATION;
  }
  
  if (message.includes('permission') || message.includes('forbidden')) {
    return ErrorType.AUTHORIZATION;
  }
  
  if (message.includes('not found') || message.includes('404')) {
    return ErrorType.NOT_FOUND;
  }
  
  if (message.includes('server') || message.includes('500')) {
    return ErrorType.SERVER;
  }
  
  if (message.includes('validation') || message.includes('invalid')) {
    return ErrorType.VALIDATION;
  }
  
  return ErrorType.UNKNOWN;
}

/**
 * Get a default user-friendly message based on error type
 */
function getDefaultUserFriendlyMessage(type: ErrorType, originalMessage: string): string {
  switch (type) {
    case ErrorType.NETWORK:
      return 'Network error. Please check your connection and try again.';
    case ErrorType.AUTHENTICATION:
      return 'Authentication error. Please log in again.';
    case ErrorType.AUTHORIZATION:
      return 'You do not have permission to perform this action.';
    case ErrorType.VALIDATION:
      return 'Please check your input and try again.';
    case ErrorType.SERVER:
      return 'Server error. Our team has been notified.';
    case ErrorType.NOT_FOUND:
      return 'The requested resource was not found.';
    case ErrorType.DATA_ENCRYPTION:
      return 'Error securing your data. Please try again.';
    case ErrorType.DATABASE:
      return 'Database operation failed. Please try again.';
    case ErrorType.API:
      return 'API request failed. Please try again.';
    default:
      // Use original message if relatively short and doesn't contain technical details
      if (originalMessage.length < 100 && !originalMessage.includes('Exception') && !originalMessage.includes('Error:')) {
        return originalMessage;
      }
      return 'An unexpected error occurred. Please try again.';
  }
}

/**
 * Utility function for async try/catch pattern that returns a tuple of [result, error]
 */
export async function tryCatch<T>(promise: Promise<T>): Promise<[T | null, AppError | null]> {
  try {
    const result = await promise;
    return [result, null];
  } catch (err) {
    const appError = handleError(err, false);
    return [null, appError];
  }
}

// Export all necessary functions and types
export { handleError, createAppError, AppError, ErrorType };
