
import agenticDatabaseService from './database/AgenticDatabaseService';
import { AgentTask, Agent, AgentTaskType } from './types/AgenticTypes';
import { processAgentTask } from './tasks/TaskProcessorService';

// Service to manage AI agents and tasks
const agenticService = {
  // Task management
  async createTask(taskData: Partial<AgentTask>): Promise<AgentTask | null> {
    try {
      const newTask = await agenticDatabaseService.createTask(taskData);
      return newTask;
    } catch (error) {
      console.error('Error creating task:', error);
      return null;
    }
  },
  
  async getUserTasks(userId: string): Promise<AgentTask[]> {
    try {
      const tasks = await agenticDatabaseService.getUserTasks(userId);
      return tasks;
    } catch (error) {
      console.error('Error fetching user tasks:', error);
      return [];
    }
  },
  
  async getTaskById(taskId: string): Promise<AgentTask | null> {
    try {
      const task = await agenticDatabaseService.getTaskById(taskId);
      return task;
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
      const success = await agenticDatabaseService.updateTaskStatus(taskId, status, result, error);
      return success;
    } catch (error) {
      console.error('Error updating task status:', error);
      return false;
    }
  },
  
  // Agent management
  async getAgents(): Promise<Agent[]> {
    try {
      const agents = await agenticDatabaseService.getAgents();
      return agents;
    } catch (error) {
      console.error('Error fetching agents:', error);
      return [];
    }
  },
  
  async getAgentById(agentId: string): Promise<Agent | null> {
    try {
      const agents = await agenticDatabaseService.getAgents();
      const agent = agents.find(agent => agent.id === agentId);
      return agent || null;
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
    
    // Update task status to in progress
    await agenticService.updateTaskStatus(taskId, 'processing');
    
    // Use the task processor service
    const processedTask = await processAgentTask(task);
    
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
    await agenticService.updateTaskStatus(taskId, 'failed', undefined, `Error: ${error}`);
    return false;
  }
};

export type { AgentTask, Agent, AgentTaskType };
export { 
  agenticService as default,
  processTask
};
