
import { AppError } from '@/utils/error-handler';

/**
 * Service for reporting errors to monitoring services
 * This can be extended to send errors to services like Sentry, LogRocket, etc.
 */
export const reportError = (error: Error | AppError, context: Record<string, any> = {}) => {
  // Log to console in all environments
  console.error('[Error Reporting]', error, context);
  
  // In production, we would send this to an error monitoring service
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to a hypothetical error monitoring service
    // sendToErrorMonitoring(error, context);
    
    // For now, we'll just log it with a note
    console.info('In production, this error would be sent to an error monitoring service');
  }
};

/**
 * Report an error that happens during API integrations
 */
export const reportApiError = (
  apiName: string,
  error: Error | AppError,
  requestData?: any
) => {
  reportError(error, {
    source: 'API Integration',
    api: apiName,
    requestData: requestData ? JSON.stringify(requestData).substring(0, 1000) : undefined,
    timestamp: new Date().toISOString()
  });
};

/**
 * Report errors that happen during data processing
 */
export const reportDataProcessingError = (
  processorName: string,
  error: Error | AppError,
  inputData?: any
) => {
  reportError(error, {
    source: 'Data Processing',
    processor: processorName,
    inputSample: inputData ? JSON.stringify(inputData).substring(0, 500) : undefined,
    timestamp: new Date().toISOString()
  });
};
