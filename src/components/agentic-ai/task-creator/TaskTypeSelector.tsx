
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Control } from 'react-hook-form';
import { Bot } from '@/utils/lucide-polyfill';

interface TaskTypeSelectorProps {
  control: Control<any>;
}

const TaskTypeSelector = ({ control }: TaskTypeSelectorProps) => {
  return (
    <FormField
      control={control}
      name="taskType"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-medium flex items-center gap-2">
            <Bot className="h-4 w-4 text-adept" />
            Task Type
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              value={field.value}
              className="grid grid-cols-1 md:grid-cols-3 gap-3"
            >
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="research" />
                </FormControl>
                <FormLabel className="font-normal">Research</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="analysis" />
                </FormControl>
                <FormLabel className="font-normal">Analysis</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="content" />
                </FormControl>
                <FormLabel className="font-normal">Content</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="coding" />
                </FormControl>
                <FormLabel className="font-normal">Coding</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="summarize" />
                </FormControl>
                <FormLabel className="font-normal">Summarize</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="custom" />
                </FormControl>
                <FormLabel className="font-normal">Custom</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormDescription className="text-xs mt-1">
            Select the type of task for the AI agent
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TaskTypeSelector;
