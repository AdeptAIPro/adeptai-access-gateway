
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from 'lucide-react';

interface AgenticErrorHandlerProps {
  error: string;
  onRetry?: () => void;
}

const AgenticErrorHandler: React.FC<AgenticErrorHandlerProps> = ({ 
  error, 
  onRetry 
}) => {
  return (
    <Alert variant="destructive" className="flex flex-col gap-4">
      <div className="flex items-start">
        <AlertCircle className="h-5 w-5 mr-2 mt-0.5" />
        <div>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error}
          </AlertDescription>
        </div>
      </div>
      
      {onRetry && (
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

export default AgenticErrorHandler;
