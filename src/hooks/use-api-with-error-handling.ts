
import { useState, useCallback } from 'react';
import { handleApiError } from '@/utils/api-error-handler';
import { AppError } from '@/utils/error-handler';

interface UseApiOptions {
  showErrorToast?: boolean;
  retryOnNetworkError?: boolean;
  maxRetries?: number;
}

export function useApiWithErrorHandling<T, P extends any[] = any[]>(
  apiFunction: (...args: P) => Promise<T>,
  options: UseApiOptions = {}
) {
  const { 
    showErrorToast = true,
    retryOnNetworkError = false,
    maxRetries = 3
  } = options;
  
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);
  
  const execute = useCallback(async (...args: P): Promise<T | null> => {
    setLoading(true);
    setError(null);
    
    let attempts = 0;
    let lastError: AppError | null = null;
    
    // Try the API call with potential retries
    while (attempts <= maxRetries) {
      try {
        const result = await apiFunction(...args);
        setData(result);
        setLoading(false);
        return result;
      } catch (err) {
        // Convert to AppError and potentially show toast
        lastError = handleApiError(err, attempts === maxRetries ? showErrorToast : false);
        
        // Only retry on network errors if option is enabled
        if (
          retryOnNetworkError && 
          lastError.type === 'NETWORK' &&
          attempts < maxRetries
        ) {
          console.log(`API call failed, retrying (${attempts + 1}/${maxRetries})...`);
          attempts++;
          // Wait before retrying (with exponential backoff)
          await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempts - 1)));
        } else {
          break;
        }
      }
    }
    
    // If we got here, all attempts failed
    if (lastError) {
      setError(lastError);
    }
    setLoading(false);
    return null;
  }, [apiFunction, maxRetries, retryOnNetworkError, showErrorToast]);
  
  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);
  
  return {
    data,
    loading,
    error,
    execute,
    reset
  };
}
