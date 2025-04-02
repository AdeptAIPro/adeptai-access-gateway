
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from 'react-hook-form';

interface TaskGoalFieldProps {
  control: Control<any>;
}

const TaskGoalField = ({ control }: TaskGoalFieldProps) => {
  return (
    <FormField
      control={control}
      name="goal"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-medium">Task Goal</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Describe what you want the AI to do..." 
              className="resize-none min-h-[100px]"
              {...field}
            />
          </FormControl>
          <FormDescription className="text-xs">
            Clearly describe the goal of this task (max 200 characters)
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TaskGoalField;
