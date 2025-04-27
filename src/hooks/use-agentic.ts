
import { useState, useEffect } from 'react';
import { useAuth } from './use-auth';
import { 
  Agent, 
  AgentTask, 
  getAllTasks as getUserTasks,
  getAgents,
  createTask,
  updateTaskStatus,
  updateAgent,
  deleteTask
} from '@/services/agentic-ai/AgenticService';
import { toast } from '@/utils/sonner-polyfill';

// Define AgentTaskType type for use in createTask
type AgentTaskType = string;

// Helper function to process task (moved from the service)
const processTask = async (taskId: string): Promise<boolean> => {
  try {
    console.log(`Processing task ${taskId}`);
    await updateTaskStatus(taskId, "in progress");
    
    // Simulate task processing with a delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update task as completed
    await updateTaskStatus(taskId, "completed");
    return true;
  } catch (error) {
    console.error(`Error processing task ${taskId}:`, error);
    await updateTaskStatus(taskId, "failed");
    return false;
  }
};

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
  
  // Fetch available agents
  const fetchAgents = async () => {
    try {
      const availableAgents = await getAgents();
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
  const handleCreateTask = async (
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
      const task = await createTask({
        taskType,
        description: goal,
        status: "pending",
        agentId,
        // We don't use userId from the API directly since it's not in the interface
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
    createTask: handleCreateTask,
    processTask: handleProcessTask,
    refreshTasks: fetchUserTasks,
    refreshAgents: fetchAgents
  };
}
