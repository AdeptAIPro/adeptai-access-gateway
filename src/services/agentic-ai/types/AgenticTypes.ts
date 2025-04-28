
// Define the Agent interface
export interface Agent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'maintenance' | 'error';
  capabilities: string[];
  // Add these optional properties to prevent TypeScript errors in AgentsList
  description?: string;
  createdAt?: Date;
}

// Define the AgentTask interface
export interface AgentTask {
  id: string;
  taskType: string;
  goal: string;
  agent: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result?: any;
  error?: string;
  createdAt: Date;
  completedAt?: Date;
  title?: string;
}

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
