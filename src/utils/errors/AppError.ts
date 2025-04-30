
import { ErrorDetails, ErrorType } from './types';

export class AppError extends Error {
  public type: ErrorType;
  public code?: string;
  public userFriendlyMessage: string;
  public originalError?: any;

  constructor(details: ErrorDetails) {
    super(details.message);
    this.name = 'AppError';
    this.type = details.type;
    this.code = details.code;
    this.userFriendlyMessage = this.getUserFriendlyMessage(details);
    this.originalError = details.originalError;

    // Maintains proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }

    // Use stack from original error if available
    if (details.stack) {
      this.stack = details.stack;
    } else if (details.originalError?.stack) {
      this.stack = details.originalError.stack;
    }
  }

  private getUserFriendlyMessage(details: ErrorDetails): string {
    // Return custom message if provided
    if (details.message) {
      return details.message;
    }

    // Default messages based on error type
    switch (details.type) {
      case ErrorType.NETWORK:
        return 'Unable to connect. Please check your internet connection.';
      case ErrorType.VALIDATION:
        return 'Please check your input and try again.';
      case ErrorType.AUTHENTICATION:
        return 'Authentication failed. Please sign in again.';
      case ErrorType.AUTHORIZATION:
        return 'You do not have permission to perform this action.';
      case ErrorType.NOT_FOUND:
        return 'The requested resource could not be found.';
      case ErrorType.SERVER:
        return 'Something went wrong on our end. Please try again later.';
      case ErrorType.UNKNOWN:
      default:
        return 'Something unexpected happened. Please try again.';
    }
  }

  // Returns a plain object representation of this error
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      type: this.type,
      code: this.code,
      userFriendlyMessage: this.userFriendlyMessage,
      stack: this.stack
    };
  }
}
