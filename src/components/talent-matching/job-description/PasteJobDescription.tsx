
import React from "react";
import { Textarea } from "@/components/ui/textarea";

interface PasteJobDescriptionProps {
  jobDescription: string;
  setJobDescription: (description: string) => void;
}

const PasteJobDescription: React.FC<PasteJobDescriptionProps> = ({
  jobDescription,
  setJobDescription,
}) => {
  return (
    <div className="space-y-4">
      <Textarea 
        placeholder="Paste job description here..."
        className="min-h-[200px]"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />
    </div>
  );
};

export default PasteJobDescription;
