
// Basic types for task results and agent tasks
import { AgentTask as BaseAgentTask } from '@/types/agent-task';

export interface TaskResult {
  id: string;
  status: 'success' | 'error' | 'processing';
  data: any;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
  timestamp: string;
  summary: string;
  details?: string;
}

export interface AgentTask extends BaseAgentTask {}
