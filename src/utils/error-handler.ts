
// Define error types enum for the application
export enum ErrorType {
  API = "api",
  VALIDATION = "validation",
  AUTHENTICATION = "authentication",
  AUTHORIZATION = "authorization",
  NETWORK = "network",
  TIMEOUT = "timeout",
  SERVER = "server",
  DATABASE = "database",
  INFRASTRUCTURE = "infrastructure",
  SECURITY = "security",
  UNKNOWN = "unknown"
}

// Error interface for structured error handling
export interface AppError {
  type: ErrorType;
  message: string;
  userFriendlyMessage?: string;
  originalError?: any;
  code?: string | number;
  stack?: string;
}

// Main error handling function
export const handleError = (
  error: AppError | Error | unknown, 
  showToast: boolean = false
): AppError => {
  let appError: AppError;
  
  // Normalize the error to AppError format
  if ((error as AppError).type) {
    appError = error as AppError;
  } else if (error instanceof Error) {
    appError = {
      type: ErrorType.UNKNOWN,
      message: error.message,
      userFriendlyMessage: "An unexpected error occurred",
      originalError: error,
      stack: error.stack
    };
  } else {
    appError = {
      type: ErrorType.UNKNOWN,
      message: "Unknown error occurred",
      userFriendlyMessage: "An unexpected error occurred",
      originalError: error
    };
  }
  
  // Log the error for debugging
  console.error(`[${appError.type.toUpperCase()}] ${appError.message}`, appError.originalError || '');
  
  // Optionally show a toast notification
  if (showToast && typeof window !== 'undefined') {
    try {
      // Dynamically import toast to avoid circular dependencies
      import('@/hooks/use-toast').then(({ toast }) => {
        toast({
          title: "Error",
          description: appError.userFriendlyMessage || appError.message,
          variant: "destructive",
        });
      }).catch(e => {
        console.error("Failed to display toast:", e);
      });
    } catch (e) {
      console.error("Toast notification failed:", e);
    }
  }
  
  return appError;
};

// Helper function to extract error message from various error formats
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  if (typeof error === 'object' && error !== null) {
    if ('message' in error && typeof error.message === 'string') return error.message;
    if ('error' in error && typeof error.error === 'string') return error.error;
  }
  return 'An unknown error occurred';
};
