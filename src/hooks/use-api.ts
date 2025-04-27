
import { useState, useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { ErrorType, handleError, createAppError, AppError } from "@/utils/error-handler";

interface ApiResponse<T> {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  error: AppError | null;
  refetch: () => Promise<T | null>;
}

/**
 * Custom hook for handling API requests with built-in error handling
 */
export function useApi<T>(url: string, options?: AxiosRequestConfig): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<AppError | null>(null);

  const fetchData = useCallback(async (): Promise<T | null> => {
    setIsLoading(true);
    setIsError(false);
    setError(null);
    
    try {
      const response = await axios(url, options);
      setData(response.data);
      return response.data;
    } catch (err) {
      let appError: AppError;
      
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        
        // Determine error type based on status code
        let errorType = ErrorType.API;
        switch (axiosError.response?.status) {
          case 400:
            errorType = ErrorType.VALIDATION;
            break;
          case 401:
            errorType = ErrorType.AUTHENTICATION;
            break;
          case 403:
            errorType = ErrorType.AUTHORIZATION;
            break;
          case 404:
            errorType = ErrorType.NOT_FOUND;
            break;
          case 500:
          case 502:
          case 503:
          case 504:
            errorType = ErrorType.SERVER;
            break;
          default:
            if (!axiosError.response) {
              errorType = ErrorType.NETWORK;
            }
        }
        
        // Extract response data if available
        const responseData = axiosError.response?.data;
        const errorMessage = typeof responseData === 'object' && responseData !== null
          ? responseData.message || responseData.error || axiosError.message
          : axiosError.message;
        
        appError = createAppError(
          errorMessage,
          errorType,
          axiosError,
          { url, method: options?.method || 'GET' }
        );
      } else {
        appError = handleError(err, false);
      }
      
      setIsError(true);
      setError(appError);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [url, options]);

  // Initial fetch
  useState(() => {
    fetchData();
  });

  return {
    data,
    isLoading,
    isError,
    error,
    refetch: fetchData
  };
}

/**
 * Create an API call with proper error handling
 */
export async function apiCall<T = any>(
  url: string, 
  options?: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await axios(url, {
      ...options,
      // Add default timeout
      timeout: options?.timeout || 30000,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      let errorType = ErrorType.API;
      
      // Determine error type based on status code
      if (!axiosError.response) {
        errorType = ErrorType.NETWORK;
      } else {
        switch (axiosError.response.status) {
          case 401: errorType = ErrorType.AUTHENTICATION; break;
          case 403: errorType = ErrorType.AUTHORIZATION; break;
          case 404: errorType = ErrorType.NOT_FOUND; break;
          case 500: 
          case 502:
          case 503:
          case 504:
            errorType = ErrorType.SERVER; 
            break;
        }
      }
      
      // Extract response data for better error messages
      const responseData = axiosError.response?.data;
      const errorMessage = typeof responseData === 'object' && responseData !== null
        ? responseData.message || responseData.error || axiosError.message
        : axiosError.message;
      
      // Create and handle a properly typed error
      const appError = createAppError(
        errorMessage,
        errorType,
        axiosError,
        { url, method: options?.method || 'GET' }
      );
      
      handleError(appError);
      throw appError;
    }
    
    // For non-Axios errors
    const appError = handleError(error);
    throw appError;
  }
}

/**
 * Wrapper for handling Promise API calls with error handling
 */
export function createApiWrapper<T>(
  apiPromiseFn: () => Promise<T>,
  fallbackValue: T,
  showToast = true
): Promise<T> {
  return apiPromiseFn().catch(error => {
    handleError(error, showToast);
    return fallbackValue;
  });
}
