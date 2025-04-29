
import { useState, useEffect, useCallback } from 'react';
import { fetchAgents } from '@/services/agentic-ai/services/agent-service';
import { fetchTasks, createTask, updateTask } from '@/services/agentic-ai/services/task-service';
import { AgentTask, Agent } from '@/services/agentic-ai/types/AgenticTypes';
import { toast } from '@/hooks/use-toast';
import { useAuth } from './use-auth';

interface AgenticUser {
  id: string;
  email?: string;
  name?: string;
}

// Renamed export to match what's being imported elsewhere
export const useAgenticAI = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [tasks, setTasks] = useState<AgentTask[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [activeTask, setActiveTask] = useState<AgentTask | null>(null); // Add missing activeTask state
  const { user } = useAuth() || { user: { id: 'guest-user' } as AgenticUser };

  // Fetch agents
  const loadAgents = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedAgents = await fetchAgents();
      setAgents(fetchedAgents);
      setError(null);
    } catch (err) {
      console.error('Error loading agents:', err);
      setError(err as Error);
      toast({
        title: 'Error',
        description: 'Failed to load agents. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch tasks
  const loadTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
      setError(null);
    } catch (err) {
      console.error('Error loading tasks:', err);
      setError(err as Error);
      toast({
        title: 'Error',
        description: 'Failed to load tasks. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Create a new task
  const handleCreateTask = useCallback(async (taskData: Omit<AgentTask, 'id' | 'status' | 'createdAt'>) => {
    try {
      setIsLoading(true);
      const userId = user?.id || 'anonymous';
      
      const newTask = await createTask({
        ...taskData,
        status: 'pending',
        userId,
      });
      
      if (newTask) {
        setTasks((prevTasks) => [...prevTasks, newTask]);
        toast({
          title: 'Task Created',
          description: 'Your task has been created successfully.',
        });
        return newTask;
      }
      return null;
    } catch (err) {
      console.error('Error creating task:', err);
      setError(err as Error);
      toast({
        title: 'Error',
        description: 'Failed to create task. Please try again.',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Process a task
  const handleProcessTask = useCallback(async (taskId: string) => {
    try {
      setIsLoading(true);
      
      // Find the task
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        setActiveTask(task); // Set the active task
      }
      
      // Update task status to processing
      const updatedTask = await updateTask(taskId, {
        status: 'processing',
      });
      
      if (updatedTask) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, status: 'processing' } : task
          )
        );
        
        toast({
          title: 'Task Processing',
          description: 'Your task is now being processed.',
        });
        
        // In a real application, this would trigger a backend process
        // For demonstration purposes, we'll simulate completion after a delay
        setTimeout(async () => {
          try {
            const completedTask = await updateTask(taskId, {
              status: 'completed',
              result: {
                summary: 'Task completed successfully',
                details: 'This is a simulated task result.',
              },
              completedAt: new Date().toISOString(),
            });
            
            if (completedTask) {
              setTasks((prevTasks) =>
                prevTasks.map((task) =>
                  task.id === taskId ? completedTask : task
                )
              );
              
              setActiveTask(completedTask); // Update the active task
              
              toast({
                title: 'Task Completed',
                description: 'Your task has been completed successfully.',
              });
            }
          } catch (error) {
            console.error('Error completing task:', error);
          }
        }, 3000);
        
        return updatedTask;
      }
      return null;
    } catch (err) {
      console.error('Error processing task:', err);
      setError(err as Error);
      toast({
        title: 'Error',
        description: 'Failed to process task. Please try again.',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [tasks]);

  // Load data on component mount
  useEffect(() => {
    loadAgents();
    loadTasks();
  }, [loadAgents, loadTasks]);

  return {
    agents,
    tasks,
    isLoading,
    error,
    activeTask, // Return activeTask
    createTask: handleCreateTask,
    processTask: handleProcessTask,
    refreshTasks: loadTasks,
    refreshAgents: loadAgents,
  };
};

// Also export original name for backward compatibility
export const useAgentic = useAgenticAI;
