
import React, { useCallback, useState } from "react";
import { ErrorFallback } from "./ErrorFallback";
import { AppError } from "@/utils/error-handler";

interface AsyncErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  variant?: "default" | "compact" | "fullscreen";
}

/**
 * Error boundary for async operations that aren't caught by React's ErrorBoundary
 * Use this component when you have async operations (like API calls) that might error
 */
export const AsyncErrorBoundary: React.FC<AsyncErrorBoundaryProps> = ({
  children,
  fallback,
  variant = "default"
}) => {
  const [error, setError] = useState<Error | AppError | null>(null);
  
  const resetError = useCallback(() => {
    setError(null);
  }, []);
  
  // Provide error reporting context to children
  const contextValue = {
    reportError: setError
  };

  if (error) {
    if (fallback) {
      return <>{fallback}</>;
    }
    
    return (
      <ErrorFallback
        error={error}
        resetErrorBoundary={resetError}
        variant={variant}
      />
    );
  }
  
  return (
    <AsyncErrorContext.Provider value={contextValue}>
      {children}
    </AsyncErrorContext.Provider>
  );
};

// Create context for reporting errors from async operations
interface AsyncErrorContextType {
  reportError: (error: Error | AppError) => void;
}

export const AsyncErrorContext = React.createContext<AsyncErrorContextType>({
  reportError: () => {} // Default no-op function
});

// Hook to use the async error context
export const useAsyncErrorContext = () => React.useContext(AsyncErrorContext);
