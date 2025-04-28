
import { ErrorType } from './types';
import { AppError } from './AppError';

/**
 * Get a default user-friendly message based on error type
 */
export function getDefaultUserFriendlyMessage(type: ErrorType, originalMessage: string): string {
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
 * Attempt to determine the error type from an error object
 */
export function determineErrorType(errorObj: Record<string, any>): ErrorType {
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
