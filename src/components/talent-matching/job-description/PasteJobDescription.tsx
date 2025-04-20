
import React from "react";
import { Textarea } from "@/components/ui/textarea";

interface PasteJobDescriptionProps {
  jobDescription: string;
  setJobDescription: (text: string) => void;
}

const PasteJobDescription: React.FC<PasteJobDescriptionProps> = ({
  jobDescription,
  setJobDescription,
}) => {
  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Paste job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        className="min-h-[200px] resize-none"
      />
      
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Min. 50 characters for AI matching
        </p>
      </div>
    </div>
  );
};

export default PasteJobDescription;
