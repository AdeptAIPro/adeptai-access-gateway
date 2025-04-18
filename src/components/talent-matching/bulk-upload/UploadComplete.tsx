
import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadCompleteProps {
  onContinue: () => void;
}

const UploadComplete: React.FC<UploadCompleteProps> = ({ onContinue }) => {
  return (
    <div className="text-center py-6">
      <div className="flex justify-center mb-4">
        <div className="rounded-full bg-green-100 p-3">
          <Check className="h-6 w-6 text-green-600" />
        </div>
      </div>
      <h3 className="text-lg font-medium mb-2">Upload Complete</h3>
      <p className="text-sm text-gray-500 mb-6">
        Your resumes have been successfully uploaded and processed.
      </p>
      <Button onClick={onContinue}>Continue</Button>
    </div>
  );
};

export default UploadComplete;
