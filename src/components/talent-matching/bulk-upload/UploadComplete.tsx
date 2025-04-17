
import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadCompleteProps {
  onContinue: () => void;
}

const UploadComplete: React.FC<UploadCompleteProps> = ({ onContinue }) => {
  return (
    <div className="py-6 text-center space-y-4">
      <CheckCircle2 className="h-16 w-16 mx-auto text-green-500" />
      <h3 className="text-lg font-medium">Upload Complete!</h3>
      <p className="text-muted-foreground">
        Your resumes have been successfully processed and are ready for AI matching.
      </p>
      <Button onClick={onContinue} className="mt-4">
        Continue to Matching
      </Button>
    </div>
  );
};

export default UploadComplete;
