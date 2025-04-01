
import { toast } from "@/hooks/use-toast";
import { AgentTask, Agent, AgentTaskType } from './types/AgenticTypes';
import agenticDatabaseService from './database/AgenticDatabaseService';
import taskProcessorService from './tasks/TaskProcessorService';

// Export types for simpler imports from other files
export type { AgentTask, Agent, AgentTaskType };

// Core Agentic AI Service
export class AgenticService {
  private static instance: AgenticService;
  
  private constructor() {}
  
  // Get singleton instance
  public static getInstance(): AgenticService {
    if (!AgenticService.instance) {
      AgenticService.instance = new AgenticService();
    }
    return AgenticService.instance;
  }
  
  // Create a new task for an agent
  public async createTask(task: Omit<AgentTask, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<AgentTask | null> {
    return agenticDatabaseService.createTask(task);
  }
  
  // Get all tasks for a user
  public async getUserTasks(userId: string): Promise<AgentTask[]> {
    return agenticDatabaseService.getUserTasks(userId);
  }
  
  // Get all available agents
  public async getAgents(): Promise<Agent[]> {
    return agenticDatabaseService.getAgents();
  }
  
  // Update task status
  public async updateTaskStatus(taskId: string, status: AgentTask['status'], result?: any, error?: string): Promise<boolean> {
    return agenticDatabaseService.updateTaskStatus(taskId, status, result, error);
  }
  
  // Process a specific task
  public async processTask(taskId: string): Promise<boolean> {
    return taskProcessorService.processTask(taskId);
  }
}

export default AgenticService.getInstance();
