
import { TaskResultData } from '@/services/agentic-ai/types/AgenticTypes';

export interface AgentTask {
  id: string;
  type?: string;
  taskType: string;
  status: "pending" | "processing" | "completed" | "failed"; // Updated to match AgenticTypes
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
