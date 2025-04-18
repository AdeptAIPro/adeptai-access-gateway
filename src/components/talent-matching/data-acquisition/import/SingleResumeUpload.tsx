
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ImportFormValues } from "./types";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface SingleResumeUploadProps {
  form: UseFormReturn<ImportFormValues>;
  isProcessing: boolean;
}

const SingleResumeUpload: React.FC<SingleResumeUploadProps> = ({
  form,
  isProcessing
}) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="resumeText"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Paste Resume Text</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Paste complete resume text here..."
                className="min-h-[200px]"
                disabled={isProcessing}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <Button 
        type="submit" 
        disabled={isProcessing || !form.getValues("resumeText")}
        className="w-full"
      >
        <Upload className="mr-2 h-4 w-4" />
        Parse Resume Text
      </Button>
    </div>
  );
};

export default SingleResumeUpload;
