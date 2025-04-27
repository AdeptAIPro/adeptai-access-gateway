
// Types for the Agentic AI system

export interface Agent {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  icon?: string;
  status: 'active' | 'inactive' | 'maintenance';
  specialties?: string[];
  version?: string;
  restrictions?: string[];
  type?: string; // Added to fix errors
}

export interface AgentTask {
  id: string;
  taskType: string;
  title?: string;
  goal: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  agent: string;
  progress?: number;
  result?: any;
  error?: string;
  createdAt: string;
  completedAt?: string;
  priority?: 'low' | 'medium' | 'high';
  params?: any; // Added to fix errors
}

export interface TaskWithAgent extends AgentTask {
  agentDetails?: Agent;
}

export interface AgenticCredentials {
  apiKey: string;
  organizationId?: string;
  isValid: boolean;
}

export type TaskResult = {
  title: string;
  data: any;
  format?: 'json' | 'text' | 'html' | 'markdown';
};

// Re-export commonly used types
export type { Agent, AgentTask, TaskWithAgent };
