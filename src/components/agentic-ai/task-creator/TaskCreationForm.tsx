
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { useAgenticAI } from '@/hooks/use-agentic';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';
import { Loader2, Bot, CheckCircle } from '@/utils/icon-polyfill';
import TaskTypeSelector from './TaskTypeSelector';
import TaskGoalField from './TaskGoalField';
import AgentSelector from './AgentSelector';
import PrioritySelector from './PrioritySelector';
import { Agent } from '@/services/agentic-ai/types/AgenticTypes';
import { getAgents } from '@/services/aws/DynamoDBService';

// Form schema
const formSchema = z.object({
  taskType: z.string().min(1, "Task type is required"),
  goal: z.string().min(10, "Please provide a more detailed goal description"),
  agentId: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
});

type FormValues = z.infer<typeof formSchema>;

const TaskCreationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { createTask } = useAgenticAI();
  const { user } = useAuth();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedTaskType, setSelectedTaskType] = useState("");

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskType: "",
      goal: "",
      agentId: "",
      priority: "medium",
    },
  });

  // Fetch agents
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const agentsList = await getAgents();
        setAgents(agentsList);
      } catch (error) {
        toast.error("Failed to fetch agents", {
          description: error instanceof Error ? error.message : "An unknown error occurred"
        });
      }
    };
    
    fetchAgents();
  }, []);

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setIsSuccess(false);
    
    try {
      // Create task
      await createTask({
        taskType: values.taskType as any,
        goal: values.goal,
        agent: values.agentId,
        params: {
          priority: values.priority,
          userId: user?.id || 'anonymous',
        }
      });
      
      // Reset form and show success message
      form.reset();
      setIsSuccess(true);
      toast.success("Task created successfully", {
        description: "Your task has been created and will be processed shortly."
      });
      
      // Reset success state after a delay
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      toast.error("Failed to create task", {
        description: error instanceof Error ? error.message : "An unknown error occurred"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle task type change
  const handleTaskTypeChange = (value: string) => {
    form.setValue('taskType', value);
    setSelectedTaskType(value);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <TaskTypeSelector 
              form={form}
              onChange={handleTaskTypeChange}
            />
            <TaskGoalField 
              control={form.control}
            />
          </div>
          
          <div className="space-y-6">
            <AgentSelector 
              control={form.control}
              selectedTaskType={selectedTaskType}
              agents={agents}
            />
            <PrioritySelector 
              control={form.control}
            />
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting || isSuccess}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Task...
            </>
          ) : isSuccess ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Task Created
            </>
          ) : (
            <>
              <Bot className="mr-2 h-4 w-4" />
              Create AI Task
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default TaskCreationForm;
