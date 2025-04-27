
import React, { useEffect, useState } from 'react';
import { AlertTriangle } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AppError, ErrorType } from '@/utils/error-handler';

// Global error state
let globalErrorListeners: ((error: AppError | null) => void)[] = [];

export function setGlobalError(error: AppError | null) {
  globalErrorListeners.forEach(listener => listener(error));
}

export function useGlobalError() {
  const [error, setError] = useState<AppError | null>(null);

  useEffect(() => {
    const listener = (newError: AppError | null) => {
      setError(newError);
    };
    
    globalErrorListeners.push(listener);
    
    return () => {
      globalErrorListeners = globalErrorListeners.filter(l => l !== listener);
    };
  }, []);

  const clearError = () => setError(null);

  return { error, clearError };
}

// Component to display critical application errors
const GlobalErrorDialog: React.FC = () => {
  const { error, clearError } = useGlobalError();
  
  if (!error) {
    return null;
  }

  // Determine actions based on error type
  const renderActions = () => {
    switch (error.type) {
      case ErrorType.AUTHENTICATION:
        return (
          <>
            <Button variant="outline" onClick={clearError}>Cancel</Button>
            <Button onClick={() => {
              clearError();
              window.location.href = "/login";
            }}>Login Again</Button>
          </>
        );
        
      case ErrorType.NETWORK:
        return (
          <>
            <Button variant="outline" onClick={clearError}>Cancel</Button>
            <Button onClick={() => {
              clearError();
              window.location.reload();
            }}>Reload Page</Button>
          </>
        );
        
      case ErrorType.SERVER:
        return (
          <>
            <Button variant="outline" onClick={clearError}>Dismiss</Button>
            <Button onClick={() => {
              clearError();
              window.location.href = "/";
            }}>Go to Homepage</Button>
          </>
        );
        
      default:
        return (
          <>
            <Button onClick={clearError}>Dismiss</Button>
          </>
        );
    }
  };

  return (
    <Dialog open={!!error} onOpenChange={() => clearError()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 mb-4">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <DialogTitle className="text-center">{error.userFriendlyMessage || "Error"}</DialogTitle>
          <DialogDescription className="text-center">
            {error.message}
            {error.type !== ErrorType.UNKNOWN && (
              <div className="mt-1 text-xs text-muted-foreground">Error type: {error.type}</div>
            )}
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="flex justify-center gap-2 sm:justify-center">
          {renderActions()}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GlobalErrorDialog;
