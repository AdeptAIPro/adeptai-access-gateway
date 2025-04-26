
export interface Agent {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  status: 'active' | 'inactive';
}

export type AgentTaskType = 'research' | 'analysis' | 'creation';

export interface AgentTask {
  id: string;
  userId: string;
  taskType: AgentTaskType;
  title?: string;
  goal: string;
  agent?: string;
  agentId?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  priority?: 'low' | 'medium' | 'high';
  createdAt?: string;
  completedAt?: string;
  error?: string;
  result?: any;
}
