
import { ErrorType, ErrorDetails } from './types';
import { AppError } from './AppError';

type AsyncFunction<T> = () => Promise<T>;

export const tryCatch = async <T>(
  fn: AsyncFunction<T>,
  errorType: ErrorType = ErrorType.UNKNOWN
): Promise<[T | null, AppError | null]> => {
  try {
    const result = await fn();
    return [result, null];
  } catch (error) {
    if (error instanceof AppError) {
      return [null, error];
    }
    
    const appError = new AppError({
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
      type: errorType,
      originalError: error,
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return [null, appError];
  }
};
