
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from '@/utils/icon-polyfill';
import { AppError, ErrorType } from '@/utils/error-handler';

interface ApiErrorHandlerProps {
  error: Error | AppError | string;
  onRetry?: () => void;
  title?: string;
  hideRetry?: boolean;
  className?: string;
}

const ApiErrorHandler: React.FC<ApiErrorHandlerProps> = ({ 
  error, 
  onRetry,
  title = "Error",
  hideRetry = false,
  className = ""
}) => {
  // Extract error message based on error type
  let errorMessage = typeof error === 'string' 
    ? error 
    : ('userFriendlyMessage' in error ? error.userFriendlyMessage : error.message);
  
  // Determine if this is a network error
  const isNetworkError = typeof error !== 'string' && 
    (('type' in error && error.type === ErrorType.NETWORK) || 
     error.message?.includes('network') || 
     error.message?.includes('connection'));
  
  // Use more user-friendly message for network errors
  if (isNetworkError) {
    errorMessage = "Unable to connect to the server. Please check your internet connection and try again.";
  }

  return (
    <Alert variant="destructive" className={`flex flex-col gap-4 ${className}`}>
      <div className="flex items-start">
        <AlertCircle className="h-5 w-5 mr-2 mt-0.5" />
        <div>
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>
            {errorMessage}
          </AlertDescription>
        </div>
      </div>
      
      {onRetry && !hideRetry && (
        <div className="flex justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRetry} 
            className="border-destructive/30 hover:bg-destructive/10"
          >
            <RefreshCcw className="mr-2 h-3 w-3" />
            Retry
          </Button>
        </div>
      )}
    </Alert>
  );
};

export default ApiErrorHandler;
