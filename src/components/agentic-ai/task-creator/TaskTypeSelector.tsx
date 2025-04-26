
import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { TaskType } from '@/services/agentic-ai/types/AgenticTypes';
import { Bot, Search, ShieldAlert, FileCheck } from '@/utils/icon-polyfill';

interface TaskTypeSelectorProps {
  form: any;
}

const TaskTypeSelector: React.FC<TaskTypeSelectorProps> = ({ form }) => {
  const taskTypeOptions = [
    { 
      value: 'cv-analysis', 
      label: 'Resume Analysis',
      icon: <FileCheck className="h-4 w-4 mr-2" />,
      description: 'Extract insights from candidate resumes'
    },
    { 
      value: 'job-match', 
      label: 'Job Matching',
      icon: <Search className="h-4 w-4 mr-2" />,
      description: 'Match candidates to job requirements'
    },
    { 
      value: 'market-analysis', 
      label: 'Market Analysis',
      icon: <Search className="h-4 w-4 mr-2" />,
      description: 'Analyze market trends for talent acquisition'
    },
    { 
      value: 'compliance-check', 
      label: 'Compliance Check',
      icon: <ShieldAlert className="h-4 w-4 mr-2" />,
      description: 'Verify compliance with regulations'
    },
    { 
      value: 'learning-recommendation', 
      label: 'Learning Recommendations',
      icon: <Bot className="h-4 w-4 mr-2" />,
      description: 'Get personalized learning paths'
    }
  ];
  
  return (
    <FormField
      control={form.control}
      name="taskType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Task Type</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select a task type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {taskTypeOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="flex items-center gap-2"
                    >
                      <div className="flex items-center">
                        {option.icon}
                        <div>
                          <span>{option.label}</span>
                          <p className="text-xs text-muted-foreground">{option.description}</p>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormDescription>
            Select the type of task you want the AI to perform
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TaskTypeSelector;
