
export interface AgentTask {
  id: string;
  taskType: string;
  goal: string;
  agent?: string;
  status: 'pending' | 'completed' | 'failed' | 'processing';
  result?: any;
  error?: string;
  createdAt?: Date;
  completedAt?: Date;
  title?: string;
}

export interface Agent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive';
  capabilities?: string[];
}
