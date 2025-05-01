
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import TaskTypeSelector from './TaskTypeSelector';
import TaskGoalField from './TaskGoalField';
import AgentSelector from './AgentSelector';
import PrioritySelector from './PrioritySelector';
import { toast } from '@/utils/sonner-polyfill';
import { z } from '@/utils/zod-polyfill';

// Define types needed for the form
interface Agent {
  id: string;
  name: string;
  capabilities: string[];
}

// Mock useAgenticAI hook since we don't have the actual implementation
const useAgenticAI = () => {
  return {
    createTask: async (task: any) => {
      console.log("Creating task:", task);
      return Promise.resolve();
    },
    agents: [],
    isLoading: false
  };
};

// Form schema
const formSchema = z.object({
  taskType: z.string({ required_error: 'Please select a task type.' }),
  goal: z.string({ required_error: 'Please describe your goal.' }).default(''),
  agentId: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']).optional().default('medium')
});

type FormValues = z.infer<typeof formSchema>;

const TaskCreationForm: React.FC = () => {
  const { createTask, agents, isLoading } = useAgenticAI();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskType: '',
      goal: '',
      agentId: '',
      priority: 'medium'
    }
  });

  const selectedTaskType = form.watch('taskType');

  const onSubmit = async (values: FormValues) => {
    try {
      // We now pass a single task object rather than individual arguments
      await createTask({
        type: values.taskType,
        goal: values.goal,
        agentId: values.agentId || '',
        priority: values.priority || 'medium'
      });
      
      toast.success("Task created successfully");
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error("Failed to create task", {
        description: "Please try again later."
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create AI Task</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <TaskTypeSelector control={form.control} />
            
            <TaskGoalField control={form.control} />
            
            <div className="space-y-4">
              <AgentSelector 
                control={form.control} 
                selectedTaskType={selectedTaskType} 
                agents={agents as Agent[]} 
              />
              
              <PrioritySelector control={form.control} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Task'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default TaskCreationForm;
