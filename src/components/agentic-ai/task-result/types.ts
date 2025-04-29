
// Define a common TaskResult interface that matches what's used in different components
export interface TaskResult {
  summary: string;
  details?: string;
  data?: any;
  findings?: any[];
  recommendations?: any[];
}

export interface AgentTask {
  id: string;
  taskType: string;
  goal?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt?: string;
  result?: TaskResult;
  error?: string;
  userId?: string;
  agentId?: string;
  priority?: string;
  params?: Record<string, any>;
}
