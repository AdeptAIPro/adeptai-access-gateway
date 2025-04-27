
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { handleError, ErrorType, AppError } from "./error-handler";

// Default timeout of 30 seconds
const DEFAULT_TIMEOUT = 30000;

// Create a custom axios instance with defaults
export const createApiClient = (config: AxiosRequestConfig = {}): AxiosInstance => {
  const instance = axios.create({
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
    ...config,
  });
  
  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      // Add auth token if available
      const token = localStorage.getItem('auth_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // Response interceptor
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      // Handle axios errors
      let errorType = ErrorType.API;
      let errorMessage = "An error occurred while processing your request.";
      
      if (!error.response) {
        // Network error
        errorType = ErrorType.NETWORK;
        errorMessage = "Unable to reach the server. Please check your connection.";
      } else {
        // Server returned an error
        switch (error.response.status) {
          case 400:
            errorType = ErrorType.VALIDATION;
            errorMessage = "The request was invalid.";
            break;
          case 401:
            errorType = ErrorType.AUTHENTICATION;
            errorMessage = "Your session has expired. Please log in again.";
            // Redirect to login page or refresh token
            break;
          case 403:
            errorType = ErrorType.AUTHORIZATION;
            errorMessage = "You don't have permission to access this resource.";
            break;
          case 404:
            errorType = ErrorType.NOT_FOUND;
            errorMessage = "The requested resource was not found.";
            break;
          case 500:
          case 502:
          case 503:
          case 504:
            errorType = ErrorType.SERVER;
            errorMessage = "A server error occurred. Please try again later.";
            break;
        }
        
        // Try to extract more detailed error message from response
        if (error.response.data) {
          const data = error.response.data as any;
          if (typeof data === 'object' && data !== null) {
            errorMessage = data.message || data.error || errorMessage;
          }
        }
      }
      
      // Create structured error
      const appError: AppError = {
        type: errorType,
        message: error.message,
        userFriendlyMessage: errorMessage,
        originalError: error,
        context: {
          url: error.config?.url,
          method: error.config?.method,
          status: error.response?.status
        }
      };
      
      // Log the error
      console.error('API Error:', appError);
      
      return Promise.reject(appError);
    }
  );
  
  return instance;
};

// Default API client instance
export const apiClient = createApiClient();
