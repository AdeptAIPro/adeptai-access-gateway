
// Basic types for task results and agent tasks
import { AgentTask as BaseAgentTask, TaskResultData } from '@/services/agentic-ai/types/AgenticTypes';

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

// Re-export TaskResultData from AgenticTypes
export { TaskResultData };
