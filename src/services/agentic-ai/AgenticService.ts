
import { AgentTask, Agent, AgentTaskType } from './types/AgenticTypes';
import { processAgenticTask } from './AgenticTaskProcessor';
import * as dynamoDb from '../aws/DynamoDBService';
import { isOpenAIInitialized } from '../llm/OpenAIService';
import { toast } from 'sonner';
import { createMockAgents } from './db/mockAgentsData';

// Flag to check if real storage is available
let usingRealStorage = false;

// Get stored tasks from various sources
const getStoredTasks = async (userId: string): Promise<AgentTask[]> => {
  try {
    // Try to get tasks from DynamoDB first
    if (usingRealStorage) {
      return await dynamoDb.getUserTasks(userId);
    }
    
    // Fall back to localStorage if DynamoDB is not available
    const storedTasks = localStorage.getItem('agenticTasks');
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks);
        return parsedTasks.filter((task: AgentTask) => task.userId === userId);
      } catch (e) {
        console.error("Failed to parse stored tasks:", e);
      }
    }
    
    // Return empty array if no tasks found
    return [];
  } catch (error) {
    console.error("Error getting stored tasks:", error);
    return [];
  }
};

// Save task to storage
const saveTask = async (task: AgentTask): Promise<void> => {
  try {
    if (usingRealStorage) {
      // Store in DynamoDB
      await dynamoDb.createTask(task as any);
      return;
    }
    
    // Store in localStorage as fallback
    const storedTasks = localStorage.getItem('agenticTasks');
    let tasks = [];
    
    if (storedTasks) {
      try {
        tasks = JSON.parse(storedTasks);
        // Filter out any existing task with the same ID
        tasks = tasks.filter((t: AgentTask) => t.id !== task.id);
      } catch (e) {
        console.error("Failed to parse stored tasks:", e);
      }
    }
    
    tasks.push(task);
    localStorage.setItem('agenticTasks', JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving task:", error);
    throw error;
  }
};

// Update a task in storage
const updateTask = async (task: AgentTask): Promise<void> => {
  try {
    if (usingRealStorage) {
      // Update in DynamoDB
      await dynamoDb.updateTaskStatus(
        task.id, 
        task.status, 
        task.result, 
        task.error
      );
      return;
    }
    
    // Update in localStorage as fallback
    const storedTasks = localStorage.getItem('agenticTasks');
    if (!storedTasks) {
      await saveTask(task);
      return;
    }
    
    try {
      const tasks = JSON.parse(storedTasks);
      const taskIndex = tasks.findIndex((t: AgentTask) => t.id === task.id);
      
      if (taskIndex >= 0) {
        tasks[taskIndex] = task;
      } else {
        tasks.push(task);
      }
      
      localStorage.setItem('agenticTasks', JSON.stringify(tasks));
    } catch (e) {
      console.error("Failed to update task in localStorage:", e);
      throw e;
    }
  } catch (error) {
    console.error(`Error updating task ${task.id}:`, error);
    throw error;
  }
};

// Get stored agents
const getStoredAgents = async (): Promise<Agent[]> => {
  try {
    if (usingRealStorage) {
      return await dynamoDb.getAgents();
    }
    
    // Fall back to localStorage
    const storedAgents = localStorage.getItem('agenticAgents');
    if (storedAgents) {
      try {
        return JSON.parse(storedAgents);
      } catch (e) {
        console.error("Failed to parse stored agents:", e);
      }
    }
    
    // Return mock agents as fallback
    const mockAgents = createMockAgents();
    localStorage.setItem('agenticAgents', JSON.stringify(mockAgents));
    return mockAgents;
  } catch (error) {
    console.error("Error getting stored agents:", error);
    
    // Return mock agents as fallback
    const mockAgents = createMockAgents();
    localStorage.setItem('agenticAgents', JSON.stringify(mockAgents));
    return mockAgents;
  }
};

// Check if backend services are available
export const checkBackendAvailability = async (): Promise<boolean> => {
  // Check if OpenAI is initialized
  if (!isOpenAIInitialized()) {
    return false;
  }
  
  // Try to check AWS credentials
  try {
    // Try basic DynamoDB operation
    await dynamoDb.getAgents();
    usingRealStorage = true;
    return true;
  } catch (error) {
    console.log("AWS services not available, falling back to localStorage");
    usingRealStorage = false;
    return false;
  }
};

// Service to manage AI agents and tasks
const agenticService = {
  // Check if backend is ready
  isBackendReady: async (): Promise<boolean> => {
    return await checkBackendAvailability();
  },
  
  // Task management
  async createTask(taskData: Partial<AgentTask>): Promise<AgentTask | null> {
    try {
      const timestamp = new Date().toISOString();
      const newTask: AgentTask = {
        id: `task-${Date.now()}`,
        taskType: taskData.taskType!,
        status: 'pending',
        goal: taskData.goal || '',
        createdAt: timestamp,
        updatedAt: timestamp,
        userId: taskData.userId || '',
        agentId: taskData.agentId || '',
        priority: taskData.priority || 'medium',
        params: taskData.params || {},
      };
      
      await saveTask(newTask);
      return newTask;
    } catch (error) {
      console.error('Error creating task:', error);
      return null;
    }
  },
  
  async getUserTasks(userId: string): Promise<AgentTask[]> {
    try {
      return await getStoredTasks(userId);
    } catch (error) {
      console.error('Error fetching user tasks:', error);
      return [];
    }
  },
  
  async getTaskById(taskId: string): Promise<AgentTask | null> {
    try {
      if (usingRealStorage) {
        return await dynamoDb.getTaskById(taskId);
      }
      
      // Fall back to localStorage
      const storedTasks = localStorage.getItem('agenticTasks');
      if (storedTasks) {
        try {
          const tasks = JSON.parse(storedTasks);
          return tasks.find((t: AgentTask) => t.id === taskId) || null;
        } catch (e) {
          console.error("Failed to parse stored tasks:", e);
        }
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching task:', error);
      return null;
    }
  },
  
  async updateTaskStatus(
    taskId: string,
    status: AgentTask['status'],
    result?: any,
    error?: string
  ): Promise<boolean> {
    try {
      if (usingRealStorage) {
        return await dynamoDb.updateTaskStatus(taskId, status, result, error);
      }
      
      // Fall back to localStorage
      const task = await this.getTaskById(taskId);
      if (!task) {
        return false;
      }
      
      const updatedTask: AgentTask = {
        ...task,
        status,
        updatedAt: new Date().toISOString(),
        ...(result !== undefined ? { result } : {}),
        ...(error !== undefined ? { error } : {})
      };
      
      await updateTask(updatedTask);
      return true;
    } catch (error) {
      console.error('Error updating task status:', error);
      return false;
    }
  },
  
  // Agent management
  async getAgents(): Promise<Agent[]> {
    try {
      return await getStoredAgents();
    } catch (error) {
      console.error('Error fetching agents:', error);
      return [];
    }
  },
  
  async getAgentById(agentId: string): Promise<Agent | null> {
    try {
      if (usingRealStorage) {
        return await dynamoDb.getAgentById(agentId);
      }
      
      const agents = await this.getAgents();
      return agents.find(agent => agent.id === agentId) || null;
    } catch (error) {
      console.error('Error fetching agent:', error);
      return null;
    }
  }
};

// Function to process a task with appropriate service
const processTask = async (taskId: string): Promise<boolean> => {
  console.log(`Processing task ${taskId}`);
  
  try {
    // Get the task
    const task = await agenticService.getTaskById(taskId);
    
    if (!task) {
      console.error(`Task not found: ${taskId}`);
      return false;
    }
    
    // Get the agent
    const agent = await agenticService.getAgentById(task.agentId);
    
    if (!agent) {
      console.error(`Agent not found: ${task.agentId}`);
      await agenticService.updateTaskStatus(taskId, 'failed', undefined, 'Agent not found');
      return false;
    }
    
    // Check if OpenAI is initialized
    if (!isOpenAIInitialized()) {
      console.error("OpenAI is not initialized. Cannot process task.");
      await agenticService.updateTaskStatus(
        taskId, 
        'failed', 
        undefined, 
        'OpenAI API is not initialized. Please set your API key.'
      );
      toast.error("OpenAI API is not initialized. Please set your API key.");
      return false;
    }
    
    // Update task status to in progress
    await agenticService.updateTaskStatus(taskId, 'processing');
    
    // Use the task processor service with real LLM integration
    const processedTask = await processAgenticTask(task);
    
    // Update the task with the result
    if (processedTask.status === 'completed') {
      await agenticService.updateTaskStatus(taskId, 'completed', processedTask.result);
      return true;
    } else {
      await agenticService.updateTaskStatus(taskId, 'failed', undefined, processedTask.error);
      return false;
    }
  } catch (error) {
    console.error(`Error processing task ${taskId}:`, error);
    await agenticService.updateTaskStatus(
      taskId, 
      'failed', 
      undefined, 
      error instanceof Error ? error.message : `Error: ${error}`
    );
    return false;
  }
};

export type { AgentTask, Agent, AgentTaskType };
export { 
  agenticService as default,
  processTask
};
