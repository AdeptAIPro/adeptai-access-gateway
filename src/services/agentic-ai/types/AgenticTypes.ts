
// Define the Agent interface
export interface Agent {
  id: string;
  name: string;
  description?: string;
  type?: string;
  capabilities: string[]; // Making capabilities required
  status?: 'active' | 'inactive' | 'deprecated';
  createdAt: string;
  updatedAt?: string;
  version?: string;
  config?: Record<string, any>;
  integrations?: string[];
  owner?: string;
}

// Define the AgentTask interface based on the unified type
import { AgentTask as BaseAgentTask } from '@/types/agent-task';
export interface AgentTask extends BaseAgentTask {}
