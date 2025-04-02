
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Sparkles } from "lucide-react";

const AlertNotification: React.FC = () => {
  return (
    <Alert className="mb-6 bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200 shadow-sm">
      <div className="flex items-center">
        <Sparkles className="h-5 w-5 text-amber-500 mr-2" />
        <AlertDescription className="text-amber-800 font-medium">
          New! Cross-Source Talent Intelligence is now available. Enable it in the matching panel to leverage AI-powered candidate analysis across multiple talent sources.
        </AlertDescription>
      </div>
    </Alert>
  );
};

export default AlertNotification;
