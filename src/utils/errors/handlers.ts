
import { ErrorType } from './types';
import { AppError } from './AppError';

/**
 * Simple utility for handling try/catch logic in async functions
 */
export const tryCatch = async <T>(
  fn: () => Promise<T>,
  errorType: ErrorType = ErrorType.UNKNOWN,
  errorMessage: string = 'An error occurred'
): Promise<[T | null, AppError | null]> => {
  try {
    const result = await fn();
    return [result, null];
  } catch (error) {
    const appError = new AppError({
      message: errorMessage,
      type: errorType,
      originalError: error
    });
    return [null, appError];
  }
};
