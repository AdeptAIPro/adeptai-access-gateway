
export interface Agent {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  status: 'active' | 'inactive';
  createdAt?: string; // Added missing createdAt property
}

export type AgentTaskType = 'research' | 'analysis' | 'creation' | 'talent-matching' | 'payroll-processing' | 'cross-source-talent-intelligence' | 'cv-analysis' | 'market-analysis' | 'job-match';

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
