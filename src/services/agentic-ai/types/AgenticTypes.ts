
// Define the basic types for the agentic AI system

export type AgentStatus = 'active' | 'inactive' | 'suspended';

export type TaskStatus = 'pending' | 'processing' | 'completed' | 'failed';

export type TaskType = 
  'cv-analysis' | 
  'job-match' | 
  'skill-assessment' | 
  'market-analysis' | 
  'compliance-check' | 
  'background-verification' | 
  'learning-recommendation' | 
  'payroll-automation';

export interface AgentTask {
  id: string;
  taskType: TaskType;
  title?: string;
  goal: string;
  status: TaskStatus;
  agent?: string;
  createdAt: string;
  updatedAt?: string;
  completedAt?: string;
  params?: Record<string, any>;
  result?: any;
  error?: string;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  status: AgentStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface ExecutionPlan {
  steps: string[];
  currentStep?: number;
}

export interface TaskResult {
  summary: string;
  findings: string[];
  recommendations: string[];
  status: 'success' | 'partial' | 'failed';
  context?: any;
  executedAt?: string;
}

// Service interfaces
export interface AgenticService {
  createTask(task: Partial<AgentTask>): Promise<AgentTask>;
  getTaskById(id: string): Promise<AgentTask | null>;
  getAllTasks(): Promise<AgentTask[]>;
  updateTask(id: string, updates: Partial<AgentTask>): Promise<AgentTask>;
  deleteTask(id: string): Promise<boolean>;
  processTask(id: string): Promise<AgentTask>;
  getAgents(): Promise<Agent[]>;
}
