
export enum ErrorType {
  VALIDATION = 'VALIDATION',
  NETWORK = 'NETWORK',
  SERVER = 'SERVER',
  AUTH = 'AUTH',
  UNKNOWN = 'UNKNOWN'
}

export interface ErrorDetails {
  message: string;
  type: ErrorType;
  code?: string;
  data?: any;
}

export class AppError extends Error {
  type: ErrorType;
  code?: string;
  data?: any;

  constructor({ message, type, code, data }: ErrorDetails) {
    super(message);
    this.type = type;
    this.code = code;
    this.data = data;
  }
}
