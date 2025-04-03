
import React from "react";
import { Loader2 } from "lucide-react";

interface ProcessingMessageProps {
  step: "initializing" | "creating_session" | "redirecting" | null;
}

const ProcessingMessage: React.FC<ProcessingMessageProps> = ({ step }) => {
  if (!step) return null;
  
  const messages = {
    initializing: "Initializing checkout...",
    creating_session: "Creating secure checkout session...",
    redirecting: "Redirecting to secure payment page..."
  };
  
  const descriptions = {
    initializing: "Preparing your checkout experience",
    creating_session: "Setting up a secure connection with our payment processor",
    redirecting: "You will be redirected momentarily"
  };
  
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex items-center justify-center space-x-3 text-sm font-medium text-adept">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>{messages[step]}</span>
      </div>
      <p className="text-xs text-muted-foreground text-center">{descriptions[step]}</p>
      <div className="w-full bg-muted h-1 rounded-full overflow-hidden mt-2">
        <div 
          className="bg-adept h-1 animate-pulse transition-all" 
          style={{ 
            width: step === "initializing" ? "33%" : step === "creating_session" ? "66%" : "100%" 
          }}
        />
      </div>
    </div>
  );
};

export default ProcessingMessage;
