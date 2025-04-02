
import { AgentTask, Agent, AgentTaskType } from '../types/AgenticTypes';
import { createMockAgents } from '../db/mockAgentsData';

// Mock database service for demonstration
const agenticDatabaseService = {
  // Task management
  async createTask(taskData: Partial<AgentTask>): Promise<AgentTask | null> {
    const newTask: AgentTask = {
      id: `task-${Date.now()}`,
      taskType: taskData.taskType!,
      status: 'pending',
      goal: taskData.goal || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: taskData.userId || '',
      agentId: taskData.agentId || '',
      priority: taskData.priority || 'medium',
      params: taskData.params || {},
    };
    
    console.log(`Created new task: ${newTask.id}`);
    return newTask;
  },
  
  async getUserTasks(userId: string): Promise<AgentTask[]> {
    console.log(`Fetching tasks for user: ${userId}`);
    return []; // In a real app, this would fetch from a database
  },
  
  async getTaskById(taskId: string): Promise<AgentTask | null> {
    console.log(`Fetching task: ${taskId}`);
    return null; // In a real app, this would fetch from a database
  },
  
  async updateTaskStatus(
    taskId: string,
    status: AgentTask['status'],
    result?: any,
    error?: string
  ): Promise<boolean> {
    console.log(`Updating task ${taskId} status to: ${status}`);
    return true; // In a real app, this would update the database
  },
  
  async getAgents(): Promise<Agent[]> {
    console.log('Fetching available agents');
    
    // Return mock agents for testing
    const mockAgents = createMockAgents();
    console.log(`Returning ${mockAgents.length} mock agents:`, mockAgents);
    
    return mockAgents;
  },
  
  // Generic database query function to support TalentMatchingAgenticService
  async executeQuery(sql: string, params?: any[]): Promise<any[]> {
    console.log(`Executing query: ${sql}`);
    console.log('Query params:', params);
    
    // For testing purposes, return mock data if the query is for candidates
    if (sql.toLowerCase().includes('candidates')) {
      return [
        {
          id: 'c1',
          name: 'Jane Smith',
          skills: ['JavaScript', 'React', 'Node.js'],
          experience: 4
        },
        {
          id: 'c2',
          name: 'John Doe',
          skills: ['Python', 'Django', 'React'],
          experience: 3
        }
      ];
    }
    
    return []; // In a real app, this would return actual database results
  }
};

// Export the executeQuery function separately so it can be imported directly
export const executeQuery = agenticDatabaseService.executeQuery;

export default agenticDatabaseService;
