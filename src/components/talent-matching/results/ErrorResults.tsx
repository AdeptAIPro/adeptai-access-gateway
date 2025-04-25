
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorResultsProps {
  error: string;
  onRetry: () => void;
}

const ErrorResults: React.FC<ErrorResultsProps> = ({ error, onRetry }) => {
  return (
    <Card className="border-destructive/50 bg-destructive/5">
      <CardContent className="flex flex-col items-center justify-center p-6">
        <AlertTriangle className="h-10 w-10 text-destructive mb-4" />
        <h3 className="text-lg font-medium text-destructive mb-2">Error</h3>
        <p className="text-center text-destructive/80 mb-4">
          {error}
        </p>
        <Button 
          variant="outline" 
          onClick={onRetry}
          className="border-destructive/30 text-destructive hover:bg-destructive/10"
        >
          Try Again
        </Button>
      </CardContent>
    </Card>
  );
};

export default ErrorResults;
