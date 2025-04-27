
import { useState, useEffect } from 'react';
import { useAuth } from './use-auth';
import agenticService, { AgentTask, Agent, AgentTaskType, processTask } from '@/services/agentic-ai/AgenticService';
import { toast } from '@/utils/sonner-polyfill';

export function useAgenticAI() {
  const [tasks, setTasks] = useState<AgentTask[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTask, setActiveTask] = useState<AgentTask | null>(null);
  const { user } = useAuth();
  
  // Load user's tasks and available agents
  useEffect(() => {
    if (user) {
      fetchUserTasks();
      fetchAgents();
    }
  }, [user]);
  
  // Fetch user tasks
  const fetchUserTasks = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const userTasks = await agenticService.getUserTasks(user.id);
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
  
  // Fetch available agents
  const fetchAgents = async () => {
    try {
      const availableAgents = await agenticService.getAgents();
      console.log('Fetched agents:', availableAgents);
      
      if (availableAgents.length === 0) {
        console.warn('No agents found. This will cause the agent selection dropdown to be empty.');
      } else {
        // Debug log for agent capabilities
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
  
  // Create a new task
  const createTask = async (
    taskType: AgentTaskType,
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
      const task = await agenticService.createTask({
        taskType,
        goal,
        userId: user.id,
        agentId,
        params,
        priority,
        deadline
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
  
  // Process a task
  const handleProcessTask = async (taskId: string) => {
    setIsLoading(true);
    try {
      // Find the task in our local state
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        setActiveTask(task);
      }
      
      const success = await processTask(taskId);
      
      if (success) {
        // Refresh the tasks to get the updated status
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
      return success;
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
    createTask,
    processTask: handleProcessTask,
    refreshTasks: fetchUserTasks,
    refreshAgents: fetchAgents
  };
}
