
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useAgenticAI } from '@/hooks/use-agentic';
import { Loader2, CheckCircle, PlusCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import TaskTypeSelector from './TaskTypeSelector';
import AgentSelector from './AgentSelector';
import TaskGoalField from './TaskGoalField';
import PrioritySelector from './PrioritySelector';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Improved form layout with more consistent spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Left column */}
          <div className="space-y-4">
            {/* Task Type Selector */}
            <div className="bg-card p-4 rounded-lg border border-border shadow-sm hover:shadow-md transition-all">
              <TaskTypeSelector 
                control={form.control}
                onTaskTypeChange={(value) => setSelectedTaskType(value)}
              />
            </div>
            
            {/* Task Goal Field */}
            <div className="bg-card p-4 rounded-lg border border-border shadow-sm hover:shadow-md transition-all">
              <TaskGoalField control={form.control} />
            </div>
          </div>
          
          {/* Right column */}
          <div className="space-y-4">
            {/* Agent Selector */}
            <div className="bg-card p-4 rounded-lg border border-border shadow-sm hover:shadow-md transition-all">
              <AgentSelector 
                control={form.control}
                agents={filteredAgents}
                selectedTaskType={selectedTaskType}
              />
            </div>
            
            {/* Priority Selector */}
            <div className="bg-card p-4 rounded-lg border border-border shadow-sm hover:shadow-md transition-all">
              <PrioritySelector control={form.control} />
            </div>
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="pt-2">
          <Button 
            type="submit" 
            className={`w-full py-5 text-base font-medium transition-all ${taskCreationSuccess ? 'bg-green-600 hover:bg-green-700' : 'bg-adept hover:bg-adept/90'}`}
            disabled={isLoading || taskCreationSuccess}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Creating Task...
              </>
            ) : taskCreationSuccess ? (
              <>
                <CheckCircle className="mr-2 h-5 w-5" />
                Task Created Successfully!
              </>
            ) : (
              <>
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Task
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TaskCreationForm;
