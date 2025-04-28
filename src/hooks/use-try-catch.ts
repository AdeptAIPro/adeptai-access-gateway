
import { useState, useCallback } from 'react';
import { handleError, ErrorType } from '@/utils/error-handler';

interface UseTryCatchOptions {
  showToast?: boolean;
  errorType?: ErrorType;
  defaultErrorMessage?: string;
}

/**
 * A custom hook to handle try-catch patterns with loading states
 */
export function useTryCatch<T>(options: UseTryCatchOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  const { 
    showToast = false, 
    errorType = ErrorType.UNKNOWN, 
    defaultErrorMessage = "An error occurred"
  } = options;

  const execute = useCallback(async <R = T>(
    promiseOrFunction: Promise<R> | (() => Promise<R>),
    onSuccess?: (result: R) => void,
    onError?: (error: Error) => void
  ): Promise<R | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // Handle both direct promises and functions that return promises
      const promise = typeof promiseOrFunction === 'function' ? 
        promiseOrFunction() : promiseOrFunction;
      
      const result = await promise;
      setIsLoading(false);
      
      if (typeof result === 'object' && result !== null) {
        // Only set data if the type matches (for type safety)
        setData(result as unknown as T);
      }
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      return result;
    } catch (err) {
      setIsLoading(false);
      
      const error = err instanceof Error ? err : new Error(defaultErrorMessage);
      setError(error);
      
      // Handle the error with our error handler
      handleError({
        type: errorType,
        message: error.message,
        userFriendlyMessage: defaultErrorMessage,
        originalError: err
      }, showToast);
      
      if (onError) {
        onError(error);
      }
      
      return null;
    }
  }, [errorType, defaultErrorMessage, showToast]);

  return {
    isLoading,
    error,
    data,
    execute,
    reset: () => {
      setError(null);
      setData(null);
    }
  };
}

export default useTryCatch;
