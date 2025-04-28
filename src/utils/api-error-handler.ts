
import axios, { AxiosError } from 'axios';
import { AppError, ErrorType, handleError, createAppError } from './error-handler';
import { showToast } from './toast-wrapper';

/**
 * Specialized error handler for API calls
 * Converts API errors to consistent AppError objects with appropriate types
 */
export function handleApiError(error: unknown, showNotification: boolean = true): AppError {
  // If it's already an AppError, just return it
  if (error instanceof AppError) {
    if (showNotification) {
      showToast.error(error.userFriendlyMessage);
    }
    return error;
  }
  
  // Handle Axios errors specially with status code mapping
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    
    // Map HTTP status codes to error types
    let errorType = ErrorType.API;
    let userFriendlyMessage = 'An error occurred while communicating with the server';
    
    switch (axiosError.response?.status) {
      case 400:
        errorType = ErrorType.VALIDATION;
        userFriendlyMessage = 'There was an issue with the data submitted';
        break;
      case 401:
        errorType = ErrorType.AUTHENTICATION;
        userFriendlyMessage = 'Your session has expired. Please log in again';
        break;
      case 403:
        errorType = ErrorType.AUTHORIZATION;
        userFriendlyMessage = 'You do not have permission to perform this action';
        break;
      case 404:
        errorType = ErrorType.NOT_FOUND;
        userFriendlyMessage = 'The requested resource was not found';
        break;
      case 500:
      case 502:
      case 503:
      case 504:
        errorType = ErrorType.SERVER;
        userFriendlyMessage = 'The server encountered an error. Please try again later';
        break;
      default:
        if (!axiosError.response) {
          errorType = ErrorType.NETWORK;
          userFriendlyMessage = 'Network error. Please check your connection';
        }
    }
    
    // Create detailed AppError
    const appError = createAppError(
      axiosError.message,
      errorType,
      axiosError,
      {
        url: axiosError.config?.url,
        status: axiosError.response?.status,
        data: axiosError.response?.data
      }
    );
    
    // Override with better user message
    appError.userFriendlyMessage = userFriendlyMessage;
    
    if (showNotification) {
      showToast.error(appError.userFriendlyMessage);
    }
    
    return appError;
  }
  
  // For other types of errors, use the general handler
  return handleError(error, showNotification);
}

/**
 * Safe API call wrapper that handles errors consistently
 */
export async function safeApiCall<T>(apiCall: () => Promise<T>, fallbackValue: T): Promise<T> {
  try {
    return await apiCall();
  } catch (error) {
    handleApiError(error, true);
    return fallbackValue;
  }
}
