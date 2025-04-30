
import { ErrorType, ErrorDetails } from './errors/types';
import { AppError } from './errors/AppError';
import { tryCatch } from './errors/handlers';

/**
 * Handles errors consistently throughout the application
 */
export const handleError = (error: ErrorDetails | Error | unknown, defaultMessage = 'An unexpected error occurred'): AppError => {
  // If it's already an AppError, return it
  if (error instanceof AppError) {
    return error;
  }

  // If it's an error with type property (matching our ErrorDetails)
  if (error && typeof error === 'object' && 'type' in error) {
    return new AppError(error as ErrorDetails);
  }

  // For standard errors
  if (error instanceof Error) {
    return new AppError({
      message: error.message || defaultMessage,
      type: ErrorType.UNKNOWN,
      originalError: error
    });
  }

  // For unknown errors
  return new AppError({
    message: defaultMessage,
    type: ErrorType.UNKNOWN,
    originalError: error
  });
};

// Create an AppError instance directly
export const createAppError = (params: ErrorDetails): AppError => {
  return new AppError(params);
};

// Re-export necessary types and functions
export { ErrorType, AppError, tryCatch };
