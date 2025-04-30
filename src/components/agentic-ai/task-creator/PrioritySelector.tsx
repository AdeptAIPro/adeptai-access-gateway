
import React from 'react';
import { FormField, FormItem, FormDescription, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/utils/shadcn-patches";
import { Control } from 'react-hook-form';
import { AlertCircle } from '@/utils/icon-polyfill';

interface PrioritySelectorProps {
  control: Control<any>;
}

const PrioritySelector = ({ control }: PrioritySelectorProps) => {
  return (
    <FormField
      control={control}
      name="priority"
      render={({ field }) => (
        <FormItem>
          <label className="text-base font-medium flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-adept" />
            Priority
          </label>
          <SelectTrigger className="h-10 w-full border-border">
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                Low
              </div>
            </SelectItem>
            <SelectItem value="medium">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                Medium
              </div>
            </SelectItem>
            <SelectItem value="high">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                High
              </div>
            </SelectItem>
          </SelectContent>
          <FormDescription className="text-xs mt-1">
            Set the priority level for this task
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PrioritySelector;
