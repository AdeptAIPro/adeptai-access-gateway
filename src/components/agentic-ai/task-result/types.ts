
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
  findings?: any[];
  recommendations?: any[];
  context?: Record<string, any>;
}

export interface AgentTask extends BaseAgentTask {}

// Define a properly typed result object that includes all possible fields
export interface TaskResultData {
  summary?: string;
  details?: string;
  data?: any;
  findings?: any[];
  recommendations?: any[];
  context?: Record<string, any>;
}
