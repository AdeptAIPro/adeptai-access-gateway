
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import TaskTypeSelector from './TaskTypeSelector';
import TaskGoalField from './TaskGoalField';
import AgentSelector from './AgentSelector';
import PrioritySelector from './PrioritySelector';
import { useAgenticTasks } from '@/hooks/use-agentic';
import { showError } from '@/utils/toast-utils'; // Import our custom toast function

const formSchema = z.object({
  taskType: z.string({ required_error: 'Please select a task type.' }),
  goal: z.string({ required_error: 'Please describe your goal.' })
    .min(10, 'Goal description must be at least 10 characters.'),
  agentId: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']).optional()
});

type FormValues = z.infer<typeof formSchema>;

const TaskCreationForm: React.FC = () => {
  const { createTask, isCreating } = useAgenticTasks();

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
      await createTask({
        taskType: values.taskType as any,
        goal: values.goal,
        agentId: values.agentId,
        priority: values.priority
      });
    } catch (error) {
      console.error('Error creating task:', error);
      // Use our custom toast function that works with a single argument
      showError('Failed to create task. Please try again later.');
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
                agents={[]}
              />
              
              <PrioritySelector control={form.control} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isCreating}>
              {isCreating ? 'Creating...' : 'Create Task'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default TaskCreationForm;
