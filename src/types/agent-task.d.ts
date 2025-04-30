
import { TaskResultData } from '@/components/agentic-ai/task-result/types';

export interface AgentTask {
  id: string;
  type?: string;
  taskType: string;
  status: string;
  goal?: string;
  description: string;
  title: string;
  agentId?: string;
  priority?: "low" | "medium" | "high";
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
}
