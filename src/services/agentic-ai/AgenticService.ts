
import { v4 as uuidv4 } from 'uuid';
import { Agent, AgentTask } from './types/AgenticTypes';

// Sample data for development
const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Data Analysis Agent',
    type: 'analysis',
    status: 'active',
    capabilities: ['Data processing', 'Pattern recognition', 'Visualization']
  },
  {
    id: '2',
    name: 'Content Writer',
    type: 'content',
    status: 'active',
    capabilities: ['Blog writing', 'SEO optimization', 'Editing']
  },
  {
    id: '3',
    name: 'Research Assistant',
    type: 'research',
    status: 'inactive',
    capabilities: ['Web search', 'Summarization', 'Fact checking']
  }
];

const mockTasks: AgentTask[] = [
  {
    id: '1',
    taskType: 'data-analysis',
    goal: 'Analyze Q1 sales data and identify top-performing products',
    agent: '1',
    status: 'completed',
    result: {
      insights: ['Product A had highest revenue', 'Product B had best margin'],
      charts: ['sales-by-product.png', 'margin-analysis.png']
    },
    createdAt: new Date('2025-03-15').toString(),
    completedAt: new Date('2025-03-16').toString(),
    title: 'Q1 Sales Analysis'
  },
  {
    id: '2',
    taskType: 'content-creation',
    goal: 'Write a blog post about AI trends in 2025',
    agent: '2',
    status: 'processing',
    createdAt: new Date('2025-04-02').toString(),
    title: 'AI Trends Blog Post'
  },
  {
    id: '3',
    taskType: 'research',
    goal: 'Research competitors in the enterprise SaaS market',
    agent: '3',
    status: 'failed',
    error: 'Could not access required data sources',
    createdAt: new Date('2025-03-28').toString(),
    title: 'Competitor Research'
  }
];

// Get all agents - this function is imported as 'getAgents' in use-agentic.ts
export const getAllAgents = (): Agent[] => {
  return mockAgents;
};

// Create a new agent
export const createAgent = (agent: Partial<Agent>): Agent => {
  const newAgent: Agent = {
    id: uuidv4(),
    name: agent.name || 'New Agent',
    type: agent.type || 'general',
    status: agent.status || 'inactive',
    capabilities: agent.capabilities || [],
    createdAt: new Date().toString(),
    ...agent
  };
  
  mockAgents.push(newAgent);
  return newAgent;
};

// Get a specific agent by ID
export const getAgentById = (id: string): Agent | undefined => {
  return mockAgents.find(agent => agent.id === id);
};

// Get all tasks
export const getTasks = (): AgentTask[] => {
  return mockTasks;
};

// Get tasks filtered by status
export const getTasksByStatus = (status: AgentTask['status']): AgentTask[] => {
  return mockTasks.filter(task => task.status === status);
};

// Get a specific task by ID
export const getTaskById = (id: string): AgentTask | undefined => {
  return mockTasks.find(task => task.id === id);
};

// Create a new task
export const createTask = (task: Partial<AgentTask>): AgentTask => {
  const newTask: AgentTask = {
    id: uuidv4(),
    taskType: task.taskType || 'general',
    goal: task.goal || '',
    agent: task.agent || '',
    status: 'pending',
    createdAt: new Date().toString(),
    ...task
  };
  
  mockTasks.push(newTask);
  return newTask;
};

// Update a task
export const updateTask = (id: string, updates: Partial<AgentTask>): AgentTask | undefined => {
  const taskIndex = mockTasks.findIndex(task => task.id === id);
  
  if (taskIndex === -1) {
    return undefined;
  }
  
  const updatedTask = {
    ...mockTasks[taskIndex],
    ...updates,
  };
  
  mockTasks[taskIndex] = updatedTask;
  return updatedTask;
};

// Update task status specifically
export const updateTaskStatus = (id: string, status: AgentTask['status']): AgentTask | undefined => {
  return updateTask(id, { status });
};

// Update task result specifically
export const updateTaskResult = (id: string, result: any): AgentTask | undefined => {
  return updateTask(id, { result });
};

// Create agentic processor (placeholder for use-agentic.ts)
export const createAgenticProcessor = () => {
  return {
    process: async (taskId: string) => {
      return await processTask(taskId);
    }
  };
};

// Create agentic service client (placeholder for use-agentic.ts)
export const createAgenticServiceClient = () => {
  return {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    getAllAgents
  };
};

// Process a task (simulate async processing)
export const processTask = async (id: string): Promise<AgentTask | undefined> => {
  const task = mockTasks.find(task => task.id === id);
  
  if (!task) {
    return undefined;
  }
  
  // Update to processing status
  updateTask(id, { status: 'processing' });
  
  // Simulate processing delay
  await new Promise<void>(resolve => {
    setTimeout(() => resolve(), 2000);
  });
  
  // Simulate success/failure (80% success rate)
  const success = Math.random() > 0.2;
  
  if (success) {
    const result = {
      summary: `Completed task: ${task.goal}`,
      details: `Generated result for ${task.taskType} task`,
    };
    
    return updateTask(id, { 
      status: 'completed', 
      result, 
      completedAt: new Date().toString() 
    });
  } else {
    return updateTask(id, {
      status: 'failed',
      error: 'Failed to process task due to an unexpected error',
    });
  }
};

// Re-export necessary types from AgenticTypes
export type { Agent, AgentTask } from './types/AgenticTypes';
