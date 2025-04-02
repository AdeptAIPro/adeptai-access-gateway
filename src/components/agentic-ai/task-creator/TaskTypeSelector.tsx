
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AgentTaskType } from '@/services/agentic-ai/types/AgenticTypes';
import { Control } from 'react-hook-form';
import { ListFilter } from 'lucide-react';

interface TaskTypeSelectorProps {
  control: Control<any>;
  onTaskTypeChange: (value: string) => void;
}

const TaskTypeSelector = ({ control, onTaskTypeChange }: TaskTypeSelectorProps) => {
  return (
    <FormField
      control={control}
      name="taskType"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-medium flex items-center gap-2">
            <ListFilter className="h-4 w-4 text-adept" />
            Task Type
          </FormLabel>
          <FormControl>
            <Select 
              onValueChange={(value) => {
                field.onChange(value);
                onTaskTypeChange(value);
              }}
              value={field.value}
            >
              <SelectTrigger className="h-10 w-full border-border">
                <SelectValue placeholder="Select a task type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="talent-search">Talent Search</SelectItem>
                <SelectItem value="talent-matching">Talent Matching</SelectItem>
                <SelectItem value="cross-source-talent-intelligence">Cross-Source Talent Intelligence</SelectItem>
                <SelectItem value="payroll-processing">Payroll Processing</SelectItem>
                <SelectItem value="skills-recommendation">Skills Recommendation</SelectItem>
                <SelectItem value="analytics-insight">Analytics Insight</SelectItem>
                <SelectItem value="compliance-check">Compliance Check</SelectItem>
                <SelectItem value="onboarding-customization">Onboarding Customization</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormDescription className="text-xs mt-1">
            Select the type of task you want the AI agent to perform
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TaskTypeSelector;
