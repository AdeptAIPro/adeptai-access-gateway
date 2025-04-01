
import { AgentTask, Agent, AgentTaskType } from './types/AgenticTypes';
import agenticDatabaseService from './database/AgenticDatabaseService';
import { processAgentTask } from './tasks/TaskProcessorService';

class AgenticService {
  // Create a new task for the agent system
  async createTask(taskData: Omit<AgentTask, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<AgentTask | null> {
    return await agenticDatabaseService.createTask(taskData);
  }
  
  // Get all tasks for a user
  async getUserTasks(userId: string): Promise<AgentTask[]> {
    return await agenticDatabaseService.getUserTasks(userId);
  }
  
  // Get all available agents
  async getAgents(): Promise<Agent[]> {
    return await agenticDatabaseService.getAgents();
  }
  
  // Process a task with the appropriate agent
  async processTask(taskId: string): Promise<boolean> {
    try {
      const task = await agenticDatabaseService.getTaskById(taskId);
      
      if (!task) {
        console.error(`Task with ID ${taskId} not found`);
        return false;
      }
      
      // Process the task with the appropriate handler
      const processedTask = await processAgentTask(task);
      
      // Update the task status in the database
      return await agenticDatabaseService.updateTaskStatus(
        taskId,
        processedTask.status,
        processedTask.result,
        processedTask.error
      );
    } catch (error) {
      console.error(`Error processing task ${taskId}:`, error);
      return false;
    }
  }
}

// Use 'export type' when re-exporting types with isolatedModules enabled
export type { AgentTask, Agent, AgentTaskType };
export default new AgenticService();
