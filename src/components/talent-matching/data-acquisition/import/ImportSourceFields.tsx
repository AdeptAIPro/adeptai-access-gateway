
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ImportFormValues } from "./types";

interface ImportSourceFieldsProps {
  form: UseFormReturn<ImportFormValues>;
  isProcessing: boolean;
}

const ImportSourceFields: React.FC<ImportSourceFieldsProps> = ({ form, isProcessing }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="sourceType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Source Type</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
              disabled={isProcessing}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a source type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="github">GitHub</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="indeed">Indeed</SelectItem>
                <SelectItem value="monster">Monster</SelectItem>
                <SelectItem value="portfolio">Portfolio Site</SelectItem>
                <SelectItem value="dataset">Resume Dataset</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="sourceName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Source Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter source name" {...field} disabled={isProcessing} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ImportSourceFields;
