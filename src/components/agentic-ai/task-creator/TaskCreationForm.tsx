
import React from 'react';
import { useAgenticAI } from '@/hooks/use-agentic';
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Bot, Loader2, RefreshCw } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AgentTaskType } from '@/services/agentic-ai/types/AgenticTypes';
import { toast } from "@/hooks/use-toast";
import TaskTypeSelector from './TaskTypeSelector';
import AgentSelector from './AgentSelector';
import TaskGoalField from './TaskGoalField';
import PrioritySelector from './PrioritySelector';

// Create a schema for task creation
const taskSchema = z.object({
  taskType: z.string({ required_error: "Please select a task type" }),
  agentId: z.string({ required_error: "Please select an agent" }),
  goal: z.string().min(5, { message: "Goal must be at least 5 characters" }).max(200),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  params: z.record(z.any()).optional(),
});

type TaskFormValues = z.infer<typeof taskSchema>;

const TaskCreationForm = () => {
  const { agents, createTask, isLoading, refreshAgents } = useAgenticAI();
  const [selectedTaskType, setSelectedTaskType] = useState<AgentTaskType | ''>('');
  const [filteredAgents, setFilteredAgents] = useState(agents);
  const [isRefreshingAgents, setIsRefreshingAgents] = useState(false);
  
  // Initialize form
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      taskType: "",
      agentId: "",
      goal: "",
      priority: "medium",
      params: {},
    },
  });
  
  // Update filtered agents whenever task type or agents list changes
  useEffect(() => {
    if (selectedTaskType) {
      const filtered = agents.filter(agent => 
        agent.capabilities && agent.capabilities.includes(selectedTaskType)
      );
      
      console.log(`Filtering agents for task type "${selectedTaskType}":`, filtered);
      
      if (filtered.length === 0) {
        console.warn(`No agents found with capability: ${selectedTaskType}`);
      }
      
      setFilteredAgents(filtered);
    } else {
      setFilteredAgents(agents);
    }
  }, [selectedTaskType, agents]);

  const handleTaskTypeChange = (value: string) => {
    console.log(`Task type changed to: ${value}`);
    setSelectedTaskType(value as AgentTaskType);
    form.setValue("taskType", value);
    form.setValue("agentId", ""); // Reset agent selection when task type changes
  };

  const onSubmit = async (values: TaskFormValues) => {
    try {
      const task = await createTask(
        values.taskType as AgentTaskType,
        values.goal,
        values.agentId,
        values.params || {},
        values.priority as "low" | "medium" | "high"
      );
      
      if (task) {
        form.reset();
        toast({
          title: "Task Created",
          description: "Your AI agent will begin working on your task.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create the task. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRefreshAgents = async () => {
    setIsRefreshingAgents(true);
    await refreshAgents();
    setIsRefreshingAgents(false);
    toast({
      title: "Agents Refreshed",
      description: "Agent list has been updated.",
    });
  };

  return (
    <>
      <div className="absolute right-4 top-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleRefreshAgents}
          disabled={isRefreshingAgents}
        >
          {isRefreshingAgents ? (
            <RefreshCw className="h-4 w-4 animate-spin mr-1" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-1" />
          )}
          Refresh
        </Button>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <TaskTypeSelector 
            control={form.control}
            onTaskTypeChange={handleTaskTypeChange}
          />

          <AgentSelector
            control={form.control}
            selectedTaskType={selectedTaskType}
            filteredAgents={filteredAgents}
          />

          <TaskGoalField control={form.control} />
          
          <PrioritySelector control={form.control} />

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || !form.formState.isValid}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Task...
              </>
            ) : (
              <>
                <Bot className="mr-2 h-4 w-4" />
                Create Task
              </>
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default TaskCreationForm;
