
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useAgenticAI } from '@/hooks/use-agentic';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import TaskTypeSelector from './TaskTypeSelector';
import AgentSelector from './AgentSelector';
import TaskGoalField from './TaskGoalField';
import PrioritySelector from './PrioritySelector';

const formSchema = z.object({
  taskType: z.string().min(1, 'Task type is required'),
  agentId: z.string().min(1, 'Agent is required'),
  goal: z.string().min(5, 'Task goal is required').max(200, 'Task goal is too long'),
  priority: z.enum(['low', 'medium', 'high']),
});

type FormValues = z.infer<typeof formSchema>;

const TaskCreationForm = () => {
  const { user } = useAuth();
  const { agents, createTask, isLoading } = useAgenticAI();
  
  const [selectedTaskType, setSelectedTaskType] = useState<string>('');
  const [filteredAgents, setFilteredAgents] = useState(agents);
  const [taskCreationSuccess, setTaskCreationSuccess] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskType: '',
      agentId: '',
      goal: '',
      priority: 'medium',
    },
  });
  
  useEffect(() => {
    // Get task-type specific agents
    const filtered = selectedTaskType
      ? agents.filter(agent => agent.capabilities.includes(selectedTaskType))
      : agents;
    
    setFilteredAgents(filtered);
    
    // If there's only one agent available, select it automatically
    if (filtered.length === 1) {
      form.setValue('agentId', filtered[0].id);
    }
  }, [selectedTaskType, agents, form]);
  
  const onSubmit = async (data: FormValues) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to create AI tasks.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const task = await createTask(
        data.taskType as any,
        data.goal,
        data.agentId,
        {},
        data.priority
      );
      
      if (task) {
        form.reset();
        setSelectedTaskType('');
        setTaskCreationSuccess(true);
        setTimeout(() => setTaskCreationSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error creating task:', error);
      toast({
        title: "Error",
        description: "There was an error creating your task.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Task Type Selector */}
        <TaskTypeSelector 
          control={form.control}
          onTaskTypeChange={(value) => setSelectedTaskType(value)}
        />
        
        {/* Agent Selector */}
        <AgentSelector 
          control={form.control}
          agents={filteredAgents}
          selectedTaskType={selectedTaskType}
        />
        
        {/* Task Goal Field */}
        <TaskGoalField control={form.control} />
        
        {/* Priority Selector */}
        <PrioritySelector control={form.control} />
        
        {/* Submit Button */}
        <div className="pt-2">
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || taskCreationSuccess}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Task...
              </>
            ) : taskCreationSuccess ? (
              "Task Created Successfully!"
            ) : (
              "Create Task"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TaskCreationForm;
