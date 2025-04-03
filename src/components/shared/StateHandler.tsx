
import React from "react";
import { AlertCircle, Loader, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface StateHandlerProps {
  isLoading?: boolean;
  isError?: boolean;
  error?: string | null;
  emptyState?: React.ReactNode;
  isEmpty?: boolean;
  onRetry?: () => void;
  loadingText?: string;
  children: React.ReactNode;
}

const StateHandler: React.FC<StateHandlerProps> = ({
  isLoading = false,
  isError = false,
  error = null,
  isEmpty = false,
  emptyState = null,
  onRetry,
  loadingText = "Loading data...",
  children
}) => {
  // Show loading state
  if (isLoading) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed min-h-[200px]">
        <Loader className="h-8 w-8 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground text-center">{loadingText}</p>
      </div>
    );
  }

  // Show error state
  if (isError) {
    return (
      <Card className="border-destructive/50 bg-destructive/5">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <AlertCircle className="h-10 w-10 text-destructive mb-4" />
          <h3 className="text-lg font-medium text-destructive mb-2">Error</h3>
          <p className="text-center text-destructive/80 mb-4">
            {error || "An unexpected error occurred. Please try again."}
          </p>
          {onRetry && (
            <Button 
              variant="outline" 
              onClick={onRetry} 
              className="border-destructive/30 text-destructive hover:bg-destructive/10"
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  // Show empty state
  if (isEmpty && emptyState) {
    return <>{emptyState}</>;
  }

  // Show content
  return <>{children}</>;
};

export default StateHandler;
