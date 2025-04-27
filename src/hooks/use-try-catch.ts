
import { useState, useCallback } from 'react';
import { handleError, AppError, tryCatch } from '@/utils/error-handler';
import { useSafeState } from './use-safe-state';

interface UseTryCatchOptions {
  showToast?: boolean;
  rethrow?: boolean;
}

interface UseTryCatchReturn<T> {
  isLoading: boolean;
  error: AppError | null;
  execute: (...args: any[]) => Promise<T | null>;
  reset: () => void;
}

/**
 * Hook for handling try/catch patterns in async functions
 */
export function useTryCatch<T>(
  fn: (...args: any[]) => Promise<T>,
  options: UseTryCatchOptions = {}
): UseTryCatchReturn<T> {
  const { showToast = true, rethrow = false } = options;
  
  const [isLoading, setIsLoading] = useSafeState(false);
  const [error, setError] = useSafeState<AppError | null>(null);
  
  const reset = useCallback(() => {
    setError(null);
  }, [setError]);
  
  const execute = useCallback(async (...args: any[]): Promise<T | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await fn(...args);
      return result;
    } catch (err) {
      const appError = handleError(err, showToast);
      setError(appError);
      
      if (rethrow) {
        throw appError;
      }
      
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [fn, showToast, rethrow, setIsLoading, setError]);
  
  return {
    isLoading,
    error,
    execute,
    reset
  };
}

/**
 * Hook for handling async data fetching with error handling
 */
export function useSafeAsync<T>(
  asyncFn: () => Promise<T>,
  dependencies: any[] = [],
  initialData: T | null = null
) {
  const [data, setData] = useSafeState<T | null>(initialData);
  const [isLoading, setIsLoading] = useSafeState(true);
  const [error, setError] = useSafeState<AppError | null>(null);
  
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    const [result, fetchError] = await tryCatch(asyncFn);
    
    setData(result);
    setError(fetchError);
    setIsLoading(false);
    
    return result;
  }, [asyncFn, setData, setError, setIsLoading]);
  
  useEffect(() => {
    fetchData();
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
  
  return {
    data,
    isLoading,
    error,
    refetch: fetchData
  };
}
