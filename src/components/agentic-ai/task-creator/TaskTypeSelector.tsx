
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from 'react-hook-form';

interface TaskTypeSelectorProps {
  form: UseFormReturn<any>;
  onChange?: (value: string) => void;
}

const TaskTypeSelector: React.FC<TaskTypeSelectorProps> = ({ form, onChange }) => {
  const handleValueChange = (value: string) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <FormField
      control={form.control}
      name="taskType"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel className="text-base font-medium">Task Type</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={(value) => {
                field.onChange(value);
                handleValueChange(value);
              }}
              value={field.value}
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
            >
              <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent">
                <RadioGroupItem value="cv-analysis" id="cv-analysis" />
                <Label htmlFor="cv-analysis" className="flex flex-col cursor-pointer">
                  <span className="font-medium">CV Analysis</span>
                  <span className="text-xs text-muted-foreground">Extract key details from resumes</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent">
                <RadioGroupItem value="job-match" id="job-match" />
                <Label htmlFor="job-match" className="flex flex-col cursor-pointer">
                  <span className="font-medium">Job Matching</span>
                  <span className="text-xs text-muted-foreground">Match candidates to requirements</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent">
                <RadioGroupItem value="talent-matching" id="talent-matching" />
                <Label htmlFor="talent-matching" className="flex flex-col cursor-pointer">
                  <span className="font-medium">Talent Matching</span>
                  <span className="text-xs text-muted-foreground">Find the best talent for roles</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent">
                <RadioGroupItem value="cross-source-talent-intelligence" id="talent-intelligence" />
                <Label htmlFor="talent-intelligence" className="flex flex-col cursor-pointer">
                  <span className="font-medium">Talent Intelligence</span>
                  <span className="text-xs text-muted-foreground">Cross-source talent analysis</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent">
                <RadioGroupItem value="payroll-processing" id="payroll-processing" />
                <Label htmlFor="payroll-processing" className="flex flex-col cursor-pointer">
                  <span className="font-medium">Payroll Processing</span>
                  <span className="text-xs text-muted-foreground">Automate payroll tasks</span>
                </Label>
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
