
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
  
  return (
    <div className="flex items-center justify-center space-x-3 text-sm font-medium text-adept">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>{messages[step]}</span>
    </div>
  );
};

export default ProcessingMessage;
