
import { ErrorType, ErrorDetails } from './types';

export class AppError extends Error {
  type: ErrorType;
  code?: string;
  data?: any;
  userFriendlyMessage: string;
  originalError?: any;
  context?: Record<string, any>;

  constructor({ message, type, code, data, userFriendlyMessage, originalError, context }: ErrorDetails) {
    super(message);
    this.type = type;
    this.code = code;
    this.data = data;
    this.userFriendlyMessage = userFriendlyMessage || message;
    this.originalError = originalError;
    this.context = context;
    
    // Ensure proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
