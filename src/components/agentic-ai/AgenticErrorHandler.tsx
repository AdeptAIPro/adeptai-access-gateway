
import React from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";

interface AgenticErrorHandlerProps {
  error: string | null;
  onRetry?: () => void;
  title?: string;
  showToast?: boolean;
}

const AgenticErrorHandler: React.FC<AgenticErrorHandlerProps> = ({
  error,
  onRetry,
  title = "AI Task Error",
  showToast = true,
}) => {
  // Show toast notification
  React.useEffect(() => {
    if (error && showToast) {
      toast.error(title, {
        description: error
      });
    }
  }, [error, showToast, title]);

  if (!error) return null;

  return (
    <Card className="border-destructive/50 bg-destructive/5 animate-fade-in">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center gap-2 mb-4">
          <div className="bg-destructive/10 p-3 rounded-full">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <h3 className="text-lg font-medium text-destructive">{title}</h3>
          <p className="text-destructive/80 max-w-md">{error}</p>
        </div>
      </CardContent>
      {onRetry && (
        <CardFooter className="flex justify-center pb-6 pt-0">
          <Button 
            variant="outline" 
            onClick={onRetry}
            className="border-destructive/30 text-destructive hover:bg-destructive/10"
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Retry Operation
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default AgenticErrorHandler;
