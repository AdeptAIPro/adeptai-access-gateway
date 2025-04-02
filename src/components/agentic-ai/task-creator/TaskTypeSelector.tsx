
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AgentTaskType } from '@/services/agentic-ai/types/AgenticTypes';
import { Control } from 'react-hook-form';

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
          <FormLabel>Task Type</FormLabel>
          <Select 
            onValueChange={(value) => onTaskTypeChange(value)} 
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a task type" />
              </SelectTrigger>
            </FormControl>
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
          <FormDescription>
            Select the type of task you want the AI agent to perform
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TaskTypeSelector;
