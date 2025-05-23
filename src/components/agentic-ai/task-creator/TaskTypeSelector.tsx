
import React from 'react';
import { 
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Control } from "react-hook-form";
import { Label } from "@/components/ui/label";

export interface TaskTypeSelectorProps {
  control: Control<any>;
}

const TaskTypeSelector: React.FC<TaskTypeSelectorProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="taskType"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <Label>Task Type</Label>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="research" />
                <label htmlFor="research" className="cursor-pointer text-center w-full">
                  <div className="font-semibold mb-1">Research</div>
                  <div className="text-sm font-normal text-muted-foreground">
                    Deep dive into topics or problems
                  </div>
                </label>
              </div>
              
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="analysis" />
                <label htmlFor="analysis" className="cursor-pointer text-center w-full">
                  <div className="font-semibold mb-1">Analysis</div>
                  <div className="text-sm font-normal text-muted-foreground">
                    Evaluate data and provide insights
                  </div>
                </label>
              </div>
              
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="creation" />
                <label htmlFor="creation" className="cursor-pointer text-center w-full">
                  <div className="font-semibold mb-1">Creation</div>
                  <div className="text-sm font-normal text-muted-foreground">
                    Generate content or creative work
                  </div>
                </label>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TaskTypeSelector;
