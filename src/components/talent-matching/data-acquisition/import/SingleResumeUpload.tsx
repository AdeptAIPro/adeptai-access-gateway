
import React from "react";
import { FormField } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { ImportFormValues } from "@/components/talent-matching/types";

interface SingleResumeUploadProps {
  form: UseFormReturn<ImportFormValues>;
  isProcessing: boolean;
}

const SingleResumeUpload: React.FC<SingleResumeUploadProps> = ({ 
  form, 
  isProcessing 
}) => {
  return (
    <div>
      <h4 className="text-sm font-medium mb-2">Single Resume</h4>
      <FormField
        control={form.control}
        name="resumeText"
        render={({ field }) => (
          <Textarea 
            placeholder="Paste resume text here" 
            className="min-h-[200px]"
            {...field}
            disabled={isProcessing}
          />
        )}
      />
    </div>
  );
};

export default SingleResumeUpload;
