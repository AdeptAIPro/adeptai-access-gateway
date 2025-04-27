
import { toast } from "sonner";

/**
 * Error types for better classification and handling
 */
export enum ErrorType {
  API = "API",
  VALIDATION = "VALIDATION",
  NETWORK = "NETWORK",
  AUTHENTICATION = "AUTHENTICATION",
  AUTHORIZATION = "AUTHORIZATION",
  NOT_FOUND = "NOT_FOUND",
  SERVER = "SERVER",
  CLIENT = "CLIENT",
  UNKNOWN = "UNKNOWN"
}

/**
 * Structured error object with additional context
 */
export interface AppError {
  type: ErrorType;
  message: string;
  originalError?: any;
  code?: string;
  context?: Record<string, any>;
  userFriendlyMessage?: string;
}

/**
 * Create a structured application error
 */
export function createAppError(
  message: string,
  type: ErrorType = ErrorType.UNKNOWN,
  originalError?: any,
  context?: Record<string, any>
): AppError {
  // Generate user-friendly message based on error type
  let userFriendlyMessage = "Something went wrong. Please try again.";
  
  switch (type) {
    case ErrorType.API:
      userFriendlyMessage = "We're having trouble communicating with our services.";
      break;
    case ErrorType.NETWORK:
      userFriendlyMessage = "Network connection issue. Please check your internet connection.";
      break;
    case ErrorType.AUTHENTICATION:
      userFriendlyMessage = "Your session may have expired. Please sign in again.";
      break;
    case ErrorType.AUTHORIZATION:
      userFriendlyMessage = "You don't have permission to perform this action.";
      break;
    case ErrorType.NOT_FOUND:
      userFriendlyMessage = "The requested information could not be found.";
      break;
    case ErrorType.SERVER:
      userFriendlyMessage = "Our servers are experiencing issues. Please try again later.";
      break;
    case ErrorType.VALIDATION:
      userFriendlyMessage = "Please check your input and try again.";
      break;
  }

  return {
    type,
    message,
    originalError,
    context,
    userFriendlyMessage,
    code: originalError?.code
  };
}

/**
 * Handle application errors consistently across the app
 */
export function handleError(error: unknown, showToast = true): AppError {
  console.error("Error caught by global handler:", error);
  
  let appError: AppError;
  
  // Convert unknown error to structured AppError
  if (typeof error === "string") {
    appError = createAppError(error);
  } else if (error instanceof Error) {
    // Try to determine error type from error name or message
    let errorType = ErrorType.UNKNOWN;
    
    if (error.message.includes("network") || error.message.includes("fetch") || error.message.includes("timeout")) {
      errorType = ErrorType.NETWORK;
    } else if (error.message.includes("401") || error.message.includes("auth") || error.message.includes("token")) {
      errorType = ErrorType.AUTHENTICATION;
    } else if (error.message.includes("403") || error.message.includes("permission") || error.message.includes("access")) {
      errorType = ErrorType.AUTHORIZATION;
    } else if (error.message.includes("404") || error.message.includes("not found")) {
      errorType = ErrorType.NOT_FOUND;
    } else if (error.message.includes("500") || error.message.includes("server")) {
      errorType = ErrorType.SERVER;
    } else if (error.message.includes("validation") || error.message.includes("invalid")) {
      errorType = ErrorType.VALIDATION;
    }
    
    appError = createAppError(error.message, errorType, error);
  } else if (typeof error === "object" && error !== null) {
    const errorObj = error as Record<string, any>;
    appError = createAppError(
      errorObj.message || "Unknown error occurred",
      (errorObj.type as ErrorType) || ErrorType.UNKNOWN,
      error
    );
  } else {
    appError = createAppError("An unexpected error occurred");
  }
  
  // Show toast notification if requested
  if (showToast) {
    toast.error(appError.userFriendlyMessage || appError.message, {
      description: appError.type !== ErrorType.UNKNOWN ? `Error type: ${appError.type}` : undefined,
      duration: 5000,
    });
  }
  
  return appError;
}

/**
 * Try to execute a function and handle any errors
 * @returns [result, error] tuple
 */
export async function tryCatch<T>(fn: () => Promise<T>): Promise<[T | null, AppError | null]> {
  try {
    const result = await fn();
    return [result, null];
  } catch (error) {
    const appError = handleError(error, false);
    return [null, appError];
  }
}

/**
 * Create an async function wrapper that handles errors
 */
export function withErrorHandling<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  showToast = true
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    try {
      return await fn(...args);
    } catch (error) {
      handleError(error, showToast);
      throw error;
    }
  };
}
