
import { v4 as uuidv4 } from 'uuid';
import { AgentTask, AgentTaskType, Agent } from './types/AgenticTypes';

// Mock data for demonstration
const mockTasks: AgentTask[] = [
  {
    id: '1',
    userId: 'user1',
    taskType: 'research',
    title: 'Market Research',
    goal: 'Research competitive products in the AI space',
    agent: 'Research Agent',
    agentId: 'agent1',
    status: 'completed',
    priority: 'high',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    completedAt: new Date().toISOString()
  },
  {
    id: '2',
    userId: 'user1',
    taskType: 'analysis',
    goal: 'Analyze customer feedback data',
    agent: 'Data Analyst',
    agentId: 'agent2',
    status: 'pending',
    priority: 'medium',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    userId: 'user1',
    taskType: 'creation',
    goal: 'Generate a blog post about AI trends',
    agent: 'Content Creator',
    agentId: 'agent3',
    status: 'failed',
    priority: 'low',
    error: 'Failed to connect to language model',
    createdAt: new Date(Date.now() - 172800000).toISOString()
  }
];

const mockAgents: Agent[] = [
  {
    id: 'agent1',
    name: 'Research Agent',
    description: 'Specialized in gathering and synthesizing information',
    capabilities: ['research'],
    status: 'active'
  },
  {
    id: 'agent2',
    name: 'Data Analyst',
    description: 'Processes and analyzes complex datasets',
    capabilities: ['analysis'],
    status: 'active'
  },
  {
    id: 'agent3',
    name: 'Content Creator',
    description: 'Creates engaging content across various formats',
    capabilities: ['creation'],
    status: 'active'
  }
];

// Interface for task creation
export interface CreateTaskParams {
  taskType: AgentTaskType;
  goal: string;
  userId: string;
  agentId?: string;
  params?: Record<string, any>;
  priority?: 'low' | 'medium' | 'high';
  deadline?: string;
}

// Get all tasks for a user
const getUserTasks = async (userId: string): Promise<AgentTask[]> => {
  // In a real implementation, this would fetch from a database
  return mockTasks.filter(task => task.userId === userId);
};

// Get all available agents
const getAgents = async (): Promise<Agent[]> => {
  // In a real implementation, this would fetch from a database
  return mockAgents;
};

// Create a new task
const createTask = async (params: CreateTaskParams): Promise<AgentTask> => {
  const newTask: AgentTask = {
    id: uuidv4(),
    userId: params.userId,
    taskType: params.taskType,
    goal: params.goal,
    agentId: params.agentId,
    status: 'pending',
    priority: params.priority || 'medium',
    createdAt: new Date().toISOString()
  };
  
  if (params.agentId) {
    const agent = mockAgents.find(a => a.id === params.agentId);
    if (agent) {
      newTask.agent = agent.name;
    }
  }
  
  // In a real implementation, this would save to a database
  mockTasks.unshift(newTask);
  
  console.log('Task created:', newTask);
  return newTask;
};

// Process a task
export const processTask = async (taskId: string): Promise<boolean> => {
  // Find the task
  const taskIndex = mockTasks.findIndex(t => t.id === taskId);
  if (taskIndex === -1) return false;
  
  const task = mockTasks[taskIndex];
  
  // Simulate processing
  console.log(`Processing task ${taskId}...`);
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Update the task (randomly succeed or fail for demo purposes)
  mockTasks[taskIndex] = {
    ...task,
    status: Math.random() > 0.2 ? 'completed' : 'failed',
    completedAt: new Date().toISOString(),
    error: Math.random() > 0.8 ? 'An error occurred during processing' : undefined
  };
  
  return mockTasks[taskIndex].status === 'completed';
};

const agenticService = {
  getUserTasks,
  getAgents,
  createTask
};

export default agenticService;
export { AgentTask, Agent, AgentTaskType };
