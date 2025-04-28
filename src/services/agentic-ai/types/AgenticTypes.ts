
export interface AgentTask {
  id: string;
  taskType: string;
  goal: string;
  agent?: string;
  status: 'pending' | 'completed' | 'failed';
  result?: any;
}

export interface Agent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive';
}
