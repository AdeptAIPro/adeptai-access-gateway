
export enum ErrorType {
  VALIDATION = 'VALIDATION',
  NETWORK = 'NETWORK',
  SERVER = 'SERVER',
  AUTH = 'AUTH',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  DATA_ENCRYPTION = 'DATA_ENCRYPTION',
  DATABASE = 'DATABASE',
  API = 'API',
  NOT_FOUND = 'NOT_FOUND',
  UNKNOWN = 'UNKNOWN'
}

export interface ErrorDetails {
  message: string;
  type: ErrorType;
  code?: string;
  data?: any;
  userFriendlyMessage?: string;
  originalError?: any;
  context?: Record<string, any>;
}
