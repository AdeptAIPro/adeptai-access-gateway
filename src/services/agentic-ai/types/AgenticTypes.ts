
// Define the Agent interface
export interface Agent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'maintenance' | 'error';
  capabilities: string[];
  description?: string;
  createdAt?: string | Date;
  specialties?: string[];
  version?: string;
  restrictions?: string[];
  icon?: string;
  parameters?: Record<string, any>; // Add parameters property
}

// Define the AgentTask interface
export interface AgentTask {
  id: string;
  taskType: string;
  goal: string;
  agentId?: string;
  agent?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result?: any;
  error?: string;
  createdAt: string | Date;
  completedAt?: string | Date;
  title?: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  params?: Record<string, any>; // Add params property
  userId?: string; // Add userId property
  updatedAt?: string | Date; // Add updatedAt property
}

// Define the AgentTaskType type alias
export type AgentTaskType = string;

// Task result interfaces
export interface TaskResult {
  summary?: string;
  details?: string;
  insights?: string[];
  charts?: string[];
  data?: any;
}

// Task query parameters
export interface TaskQueryParams {
  status?: AgentTask['status'];
  agent?: string;
  taskType?: string;
  fromDate?: Date;
  toDate?: Date;
  limit?: number;
  offset?: number;
}
