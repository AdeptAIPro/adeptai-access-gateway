
// If this file doesn't exist, we're creating it with the necessary types

export interface Agent {
  id: string;
  name: string;
  description?: string;
  type?: string;
  capabilities?: string[];
  status?: 'active' | 'inactive' | 'deprecated';
  createdAt: string;
  updatedAt?: string;
  version?: string;
  config?: Record<string, any>;
  integrations?: string[];
  owner?: string;
}

export interface AgentTask {
  id: string;
  agentId?: string;
  taskType: string;
  description: string;
  goal?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  priority?: 'low' | 'medium' | 'high';
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  result?: {
    summary?: string;
    details?: string;
    data?: any;
  };
  params?: Record<string, any>;
  userId?: string;
  updatedAt?: string;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
}
