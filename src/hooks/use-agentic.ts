
import { useState, useEffect, useCallback } from "react";
import {
  Agent,
  AgentTask,
  getAllAgents,
  createAgent,
  createTask,
  createAgenticProcessor,
  createAgenticServiceClient,
  updateTaskStatus,
  updateTaskResult,
  processTask
} from "@/services/agentic-ai/AgenticService";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";

const getUserTasks = async () => {
  // This is a placeholder function - will be replaced with proper implementation when available
  console.warn("getUserTasks is a placeholder function - replace with proper implementation when available");
  return [];
};

export function useAgenticAI() {
  const [tasks, setTasks] = useState<AgentTask[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]); 
  const [isLoading, setIsLoading] = useState(false);
  const [activeTask, setActiveTask] = useState<AgentTask | null>(null);
  
  // Use a safer approach for useAuth to avoid potential undefined errors
  const auth = useAuth?.() || {};
  const user = auth.user;
  
  useEffect(() => {
    if (user) {
      fetchUserTasks();
      fetchAgents();
    }
  }, [user]);
  
  const fetchUserTasks = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const userTasks = await getUserTasks();
      setTasks(userTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error("Failed to Load Tasks", { 
        description: "We couldn't fetch your AI agent tasks." 
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchAgents = async () => {
    try {
      const availableAgents = await getAllAgents();
      console.log('Fetched agents:', availableAgents);
      
      if (availableAgents.length === 0) {
        console.warn('No agents found. This will cause the agent selection dropdown to be empty.');
      } else {
        availableAgents.forEach(agent => {
          console.log(`Agent ${agent.name} capabilities:`, agent.capabilities);
        });
      }
      
      setAgents(availableAgents);
    } catch (error) {
      console.error('Error fetching agents:', error);
      toast.error("Failed to Load Agents", {
        description: "We couldn't fetch available AI agents."
      });
    }
  };
  
  const handleCreateTask = async (
    taskType: string,
    goal: string,
    agentId: string,
    params: Record<string, any> = {},
    priority: 'low' | 'medium' | 'high' = 'medium',
    deadline?: string
  ) => {
    if (!user) {
      toast.error("Authentication Required", {
        description: "Please log in to create AI tasks."
      });
      return null;
    }
    
    setIsLoading(true);
    try {
      const task = await createTask({
        taskType,
        goal,
        agent: agentId,
        status: "pending",
        priority,
      });
      
      if (task) {
        setTasks(prev => [task, ...prev]);
        toast.success("Task Created", {
          description: "Your AI agent has been assigned a new task."
        });
        return task;
      }
      return null;
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error("Failed to Create Task", {
        description: "We couldn't create your AI task. Please try again."
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleProcessTask = async (taskId: string) => {
    setIsLoading(true);
    try {
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        setActiveTask(task);
      }
      
      const success = await processTask(taskId);
      
      if (success) {
        await fetchUserTasks();
        toast.success("Task Completed", {
          description: "Your AI agent has completed the assigned task."
        });
      } else {
        toast.error("Task Processing Failed", {
          description: "The AI agent couldn't complete the task. Please try again."
        });
      }
      
      setActiveTask(null);
      return !!success;
    } catch (error) {
      console.error('Error processing task:', error);
      toast.error("Processing Error", {
        description: "There was an error while processing your AI task."
      });
      setActiveTask(null);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    tasks,
    agents,
    isLoading,
    activeTask,
    createTask: handleCreateTask,
    processTask: handleProcessTask,
    refreshTasks: fetchUserTasks,
    refreshAgents: fetchAgents
  };
}
