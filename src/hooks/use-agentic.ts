
import { useState, useEffect, useCallback } from 'react';
import { fetchAgents } from '@/services/agentic-ai/services/agent-service'; 
import { fetchTasks } from '@/services/agentic-ai/services/task-service';
import { Agent, AgentTask } from '@/services/agentic-ai/types/AgenticTypes';
import { useAuth } from '@/hooks/use-auth';
import { v4 as uuidv4 } from 'uuid';

export interface UseAgenticReturn {
  agents: Agent[];
  tasks: AgentTask[];
  activeTask: AgentTask | null;
  isLoading: boolean;
  error: Error | null;
  createTask: (taskData: Omit<AgentTask, "id" | "createdAt" | "status">) => Promise<AgentTask>;
  processTask: (taskId: string) => Promise<AgentTask>;
  refreshTasks: () => Promise<AgentTask[]>;
  refreshAgents: () => Promise<Agent[]>;
}

export const useAgenticAI = (): UseAgenticReturn => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [tasks, setTasks] = useState<AgentTask[]>([]);
  const [activeTask, setActiveTask] = useState<AgentTask | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();
  
  // Fetch initial data
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        await refreshAgents();
        await refreshTasks();
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load data'));
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user) {
      loadInitialData();
    }
  }, [user]);
  
  // Refresh agents
  const refreshAgents = useCallback(async () => {
    try {
      const fetchedAgents = await fetchAgents();
      setAgents(fetchedAgents);
      return fetchedAgents;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch agents'));
      return [];
    }
  }, []);
  
  // Refresh tasks
  const refreshTasks = useCallback(async () => {
    try {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
      return fetchedTasks;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch tasks'));
      return [];
    }
  }, []);
  
  // Create a new task
  const createTask = useCallback(async (taskData: Omit<AgentTask, "id" | "createdAt" | "status">) => {
    setIsLoading(true);
    try {
      // In a real implementation, we would call an API to create the task
      // For now, we're creating it locally for demonstration
      const newTask: AgentTask = {
        id: uuidv4(),
        title: taskData.title,
        taskType: taskData.taskType,
        description: taskData.description,
        goal: taskData.goal || '',
        status: 'pending',
        createdAt: new Date().toISOString(),
        ...(taskData as any),
      };
      
      setTasks(prev => [newTask, ...prev]);
      setActiveTask(newTask);
      return newTask;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create task'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Process a task
  const processTask = useCallback(async (taskId: string) => {
    setIsLoading(true);
    try {
      const task = tasks.find(t => t.id === taskId);
      if (!task) {
        throw new Error(`Task not found: ${taskId}`);
      }
      
      // Set as active task
      setActiveTask(task);
      
      // In a real implementation, we would call an API to process the task
      // For now, we're updating it locally for demonstration
      const updatedTask: AgentTask = {
        ...task,
        status: task.status === 'pending' ? 'processing' : task.status,
        startedAt: task.startedAt || new Date().toISOString(),
      };
      
      // Simulate processing
      setTimeout(() => {
        setTasks(prev => 
          prev.map(t => t.id === taskId 
            ? { 
                ...t, 
                status: 'completed',
                completedAt: new Date().toISOString(),
                result: { 
                  summary: 'Task completed successfully!',
                  details: `Task ${t.title || t.taskType} has been processed.`
                } 
              } 
            : t
          )
        );
        setIsLoading(false);
      }, 2000);
      
      // Update the tasks array
      setTasks(prev => 
        prev.map(t => t.id === taskId ? updatedTask : t)
      );
      
      return updatedTask;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to process task'));
      throw err;
    }
  }, [tasks]);
  
  return {
    agents,
    tasks,
    activeTask,
    isLoading,
    error,
    createTask,
    processTask,
    refreshTasks,
    refreshAgents,
  };
};

// Export default for compatibility
export default useAgenticAI;
