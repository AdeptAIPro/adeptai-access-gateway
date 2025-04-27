
import React from 'react';
import { AlertTriangle } from '@/utils/lucide-polyfill';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { AppError, ErrorType } from '@/utils/error-handler';

interface ErrorFallbackProps {
  error: Error | AppError;
  resetErrorBoundary: () => void;
  variant?: 'default' | 'compact' | 'fullscreen';
  title?: string;
}

export const ErrorFallback = ({
  error,
  resetErrorBoundary,
  variant = 'default',
  title = 'Something went wrong'
}: ErrorFallbackProps) => {
  // Determine if this is a structured AppError
  const isAppError = 'type' in error && 'userFriendlyMessage' in error;
  const errorMessage = isAppError ? error.userFriendlyMessage : error.message;
  const errorType = isAppError ? error.type as ErrorType : ErrorType.UNKNOWN;
  
  // Get appropriate UI for different error types
  const getErrorIcon = () => {
    return <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />;
  };
  
  // Use more appropriate message for network errors
  const displayMessage = errorType === ErrorType.NETWORK
    ? "Unable to connect to our services. Please check your internet connection and try again."
    : errorMessage;

  if (variant === 'compact') {
    return (
      <div className="p-4 border border-destructive/30 bg-destructive/5 rounded-md">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <div className="flex-1">
            <h4 className="font-medium text-destructive">{title}</h4>
            <p className="text-sm text-muted-foreground">{displayMessage}</p>
          </div>
          <Button variant="outline" size="sm" onClick={resetErrorBoundary}>Try again</Button>
        </div>
      </div>
    );
  }
  
  if (variant === 'fullscreen') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
        <div className="max-w-md w-full text-center">
          {getErrorIcon()}
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-muted-foreground mb-6">
            {displayMessage}
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/'}
            >
              Go to home page
            </Button>
            <Button onClick={resetErrorBoundary}>Try again</Button>
          </div>
        </div>
      </div>
    );
  }
  
  // Default variant
  return (
    <Card>
      <CardHeader className="text-center">
        {getErrorIcon()}
        <h3 className="text-lg font-semibold">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground">
          {displayMessage}
        </p>
        {isAppError && error.type !== ErrorType.UNKNOWN && (
          <p className="text-xs text-center text-muted-foreground mt-2">
            Type: {error.type}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={resetErrorBoundary}>
          Try again
        </Button>
      </CardFooter>
    </Card>
  );
};
