
// Define types for agent actions and tasks
export interface AgentTask {
  id: string;
  taskType: AgentTaskType;
  status: 'pending' | 'in-progress' | 'processing' | 'completed' | 'failed';
  goal: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  agentId: string;
  agent?: string; // Added agent property
  title?: string; // Added title property
  result?: any;
  error?: string;
  priority: 'low' | 'medium' | 'high';
  deadline?: string;
  params: Record<string, any>;
}

export type AgentTaskType = 
  'talent-search' | 
  'talent-matching' | 
  'integration-setup' | 
  'payroll-processing' | 
  'skills-recommendation' | 
  'analytics-insight' | 
  'compliance-check' | 
  'onboarding-customization' |
  'cross-source-talent-intelligence' |
  'payroll';

export interface Agent {
  id: string;
  name: string;
  description: string;
  type: string;
  capabilities: string[];
  parameters: Record<string, any>;
  status: 'active' | 'inactive';
  createdAt: string;
}
