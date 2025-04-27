
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
      // Add security headers
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
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
      
      // Add CSRF token for non-GET requests
      const csrfToken = localStorage.getItem('csrf_token');
      if (csrfToken && config.headers && config.method !== 'get') {
        config.headers['X-CSRF-Token'] = csrfToken;
      }

      // Add timestamp to prevent caching of sensitive requests
      if (config.method !== 'get') {
        const url = new URL(config.url || '', window.location.origin);
        url.searchParams.append('_t', Date.now().toString());
        config.url = url.toString().replace(window.location.origin, '');
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
      // Verify response doesn't contain malicious scripts
      if (
        response.data && 
        typeof response.data === 'string' && 
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi.test(response.data)
      ) {
        const cleanedError = createAppError(
          "Potential security risk detected in response",
          ErrorType.SECURITY,
          new Error("XSS attempt detected in response"),
          { url: response.config.url }
        );
        return Promise.reject(cleanedError);
      }
      
      // Renew CSRF token periodically
      if (response.headers['x-csrf-token']) {
        localStorage.setItem('csrf_token', response.headers['x-csrf-token']);
      }
      
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
          case 419: // Laravel CSRF token mismatch
          case 422: // CSRF failure in some frameworks
            errorType = ErrorType.SECURITY;
            errorMessage = "Security validation failed. Please refresh and try again.";
            // Regenerate CSRF token
            localStorage.setItem('csrf_token', `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
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

// Create a function to generate AppError
export const createAppError = (
  message: string, 
  type: ErrorType, 
  originalError?: Error, 
  context?: Record<string, any>
): AppError => {
  return {
    type,
    message,
    userFriendlyMessage: message,
    originalError,
    context
  };
};

// Default API client instance
export const apiClient = createApiClient();
