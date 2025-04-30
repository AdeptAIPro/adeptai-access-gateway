
export interface AgentTask {
  id: string;
  type: string;
  status: string;
  goal: string;
  agentId?: string;
  priority?: "low" | "medium" | "high";
  createdAt: string | Date;
  updatedAt: string | Date;
  result?: any;
  error?: string | { message: string; code?: string; details?: any; };
  progress?: number;
}
