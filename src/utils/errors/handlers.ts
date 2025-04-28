
import { ErrorType } from './types';
import { AppError } from './AppError';
import { determineErrorType, getDefaultUserFriendlyMessage } from './utils';
import { showToast } from '../toast-wrapper';

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
  
  if (typeof error === 'object' && error !== null) {
    const errorObj = error as Record<string, any>;
    
    return new AppError({
      message: errorObj.message || 'Unknown error occurred',
      type: determineErrorType(errorObj),
      userFriendlyMessage: errorObj.userFriendlyMessage || 'An error occurred',
      originalError: error
    });
  }
  
  return new AppError({
    message: String(error),
    type: ErrorType.UNKNOWN,
    userFriendlyMessage: 'An unexpected error occurred'
  });
}

/**
 * Handle errors consistently across the application
 */
export function handleError(error: unknown, showToastNotification: boolean = false): AppError {
  const appError = convertToAppError(error);
  
  // Log the error
  console.error('[Error]:', appError.message, appError);
  
  if (showToastNotification) {
    try {
      showToast.error(appError.message, appError.userFriendlyMessage);
    } catch (e) {
      console.error('Toast notification failed:', e);
    }
  }
  
  return appError;
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
