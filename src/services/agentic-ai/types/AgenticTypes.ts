
// Define the Agent interface
export interface Agent {
  id: string;
  name: string;
  description?: string;
  type?: string;
  capabilities: string[]; // Making capabilities required
  status?: 'active' | 'inactive' | 'deprecated';
  createdAt: string;
  updatedAt?: string;
  version?: string;
  config?: Record<string, any>;
  integrations?: string[];
  owner?: string;
}

// Define the TaskResultData interface to support all needed properties
export interface TaskResultData {
  summary?: string;
  details?: string;
  data?: any;
  findings?: any[];
  recommendations?: any[];
  context?: any;
  message?: string;
  candidates?: any[];
  // Add other potential result data fields
  [key: string]: any;
}

// Define the AgentTask interface based on the unified type
export interface AgentTask {
  id: string;
  taskType: string;
  description: string;
  title: string;
  goal?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string | Date;
  updatedAt: string | Date;
  startedAt?: string;
  completedAt?: string;
  result?: TaskResultData;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
  progress?: number;
  params?: Record<string, any>;
  userId?: string;
  agentId?: string;
  priority?: "low" | "medium" | "high";
}

// Export AgentTask as a type alias to maintain backward compatibility
export type AgentTaskType = AgentTask;
