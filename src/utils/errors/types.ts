
export enum ErrorType {
  VALIDATION = 'Validation Error',
  NETWORK = 'Network Error',
  SERVER = 'Server Error',
  AUTH = 'Authentication Error',
  AUTHENTICATION = 'Authentication Error',
  AUTHORIZATION = 'Authorization Error',
  DATA_ENCRYPTION = 'Data Encryption Error',
  DATABASE = 'Database Error',
  API = 'API Error',
  NOT_FOUND = 'Not Found Error',
  UNKNOWN = 'Unknown Error',
  SECURITY = 'Security Error',
  INFRASTRUCTURE = 'Infrastructure Error',
  AWS = 'AWS Service Error',
  CONFIGURATION = 'Configuration Error',
  DATA = 'Data Error'
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
