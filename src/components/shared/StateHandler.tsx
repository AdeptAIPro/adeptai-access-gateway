
import React, { ReactNode } from 'react';
import { Loader2, AlertTriangle, FileX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StateHandlerProps {
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  children: ReactNode;
  loadingText?: string;
  errorText?: string;
  emptyState?: ReactNode;
  onRetry?: () => void;
}

/**
 * StateHandler component to handle common UI states:
 * - Loading
 * - Error
 * - Empty
 * - Success (renders children)
 */
const StateHandler: React.FC<StateHandlerProps> = ({
  isLoading = false,
  isError = false,
  isEmpty = false,
  children,
  loadingText = 'Loading...',
  errorText = 'Something went wrong. Please try again.',
  emptyState,
  onRetry,
}) => {
  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <p className="mt-4 text-muted-foreground">{loadingText}</p>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertTriangle className="h-8 w-8 text-destructive" />
        <p className="mt-4 text-center text-muted-foreground">{errorText}</p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" className="mt-4">
            Try Again
          </Button>
        )}
      </div>
    );
  }

  // Empty state
  if (isEmpty) {
    if (emptyState) {
      return <>{emptyState}</>;
    }

    return (
      <div className="flex flex-col items-center justify-center py-12">
        <FileX className="h-8 w-8 text-muted-foreground" />
        <p className="mt-4 text-center text-muted-foreground">No data found</p>
      </div>
    );
  }

  // Default: render children (success state)
  return <>{children}</>;
};

export default StateHandler;
