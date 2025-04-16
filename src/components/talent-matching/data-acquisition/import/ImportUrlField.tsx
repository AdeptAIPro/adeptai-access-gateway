
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ImportFormValues } from "./types";

interface ImportUrlFieldProps {
  form: UseFormReturn<ImportFormValues>;
  isProcessing: boolean;
}

const ImportUrlField: React.FC<ImportUrlFieldProps> = ({ form, isProcessing }) => {
  return (
    <FormField
      control={form.control}
      name="sourceUrl"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Source URL (Optional)</FormLabel>
          <FormControl>
            <Input placeholder="https://example.com" {...field} disabled={isProcessing} />
          </FormControl>
          <FormDescription>
            The URL where the resume or profile was found
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ImportUrlField;
