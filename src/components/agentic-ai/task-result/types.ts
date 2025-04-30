
// Basic types for task results and agent tasks

export interface TaskResult {
  id: string;
  status: 'success' | 'error' | 'processing';
  data: any;
  error?: string | {
    message: string;
    code?: string;
    details?: any;
  };
  timestamp: string;
  summary?: string;
  details?: string;
}

export interface AgentTask {
  id: string;
  title: string;
  type: string;
  taskType: string;
  description: string;
  goal?: string;
  agentId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt?: string;
  result?: TaskResult;
  error?: string | {
    message: string;
    code?: string;
    details?: any;
  };
}
