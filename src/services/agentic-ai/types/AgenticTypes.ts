
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

// Define the AgentTask interface
export interface AgentTask {
  id: string;
  agentId?: string;
  title: string; // Adding required title property
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
