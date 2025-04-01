
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

// Define types for agent actions and tasks
export interface AgentTask {
  id: string;
  taskType: AgentTaskType;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  goal: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  agentId: string;
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
  'onboarding-customization';

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

// Core Agentic AI Service
export class AgenticService {
  private static instance: AgenticService;
  private tableName = 'agent_tasks';
  private agentsTableName = 'agents';
  
  private constructor() {}
  
  // Get singleton instance
  public static getInstance(): AgenticService {
    if (!AgenticService.instance) {
      AgenticService.instance = new AgenticService();
    }
    return AgenticService.instance;
  }
  
  // Create a new task for an agent
  public async createTask(task: Omit<AgentTask, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<AgentTask | null> {
    try {
      const now = new Date().toISOString();
      
      const newTask = {
        ...task,
        status: 'pending' as const,
        createdAt: now,
        updatedAt: now
      };
      
      const { data, error } = await supabase
        .from(this.tableName)
        .insert([newTask])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating agent task:', error);
        throw error;
      }
      
      console.log('Created new agent task:', data);
      return data as AgentTask;
    } catch (error) {
      console.error('Failed to create agent task:', error);
      toast({
        title: "Task Creation Failed",
        description: "We couldn't create the agent task. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  }
  
  // Get all tasks for a user
  public async getUserTasks(userId: string): Promise<AgentTask[]> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('userId', userId)
        .order('createdAt', { ascending: false });
      
      if (error) {
        console.error('Error fetching user tasks:', error);
        throw error;
      }
      
      return data as AgentTask[];
    } catch (error) {
      console.error('Failed to fetch user tasks:', error);
      return [];
    }
  }
  
  // Get all available agents
  public async getAgents(): Promise<Agent[]> {
    try {
      const { data, error } = await supabase
        .from(this.agentsTableName)
        .select('*')
        .eq('status', 'active');
      
      if (error) {
        console.error('Error fetching agents:', error);
        throw error;
      }
      
      return data as Agent[];
    } catch (error) {
      console.error('Failed to fetch agents:', error);
      return [];
    }
  }
  
  // Update task status
  public async updateTaskStatus(taskId: string, status: AgentTask['status'], result?: any, error?: string): Promise<boolean> {
    try {
      const { error: updateError } = await supabase
        .from(this.tableName)
        .update({ 
          status, 
          result, 
          error, 
          updatedAt: new Date().toISOString() 
        })
        .eq('id', taskId);
      
      if (updateError) {
        console.error('Error updating task status:', updateError);
        throw updateError;
      }
      
      return true;
    } catch (error) {
      console.error('Failed to update task status:', error);
      return false;
    }
  }
  
  // Process a specific task (to be implemented by feature-specific services)
  public async processTask(taskId: string): Promise<boolean> {
    try {
      // Get the task
      const { data: task, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('id', taskId)
        .single();
      
      if (error || !task) {
        console.error('Error fetching task:', error);
        return false;
      }
      
      // Update task to in-progress
      await this.updateTaskStatus(taskId, 'in-progress');
      
      // Process the task based on type
      let result: any = null;
      let processError: string | undefined = undefined;
      
      try {
        // Route to appropriate service based on task type
        switch (task.taskType) {
          case 'talent-search':
            const talentService = await import('../agentic-ai/talent/TalentSearchAgenticService');
            result = await talentService.processTalentSearchTask(task);
            break;
          case 'talent-matching':
            const matchingService = await import('../agentic-ai/talent/TalentMatchingAgenticService');
            result = await matchingService.processTalentMatchingTask(task);
            break;
          case 'payroll-processing':
            const payrollService = await import('../agentic-ai/payroll/PayrollAgenticService');
            result = await payrollService.processPayrollTask(task);
            break;
          // Add other task types as needed
          default:
            throw new Error(`Unsupported task type: ${task.taskType}`);
        }
      } catch (e: any) {
        processError = e.message || 'Unknown error occurred';
        await this.updateTaskStatus(taskId, 'failed', null, processError);
        return false;
      }
      
      // Update task to completed with result
      await this.updateTaskStatus(taskId, 'completed', result);
      return true;
    } catch (error) {
      console.error('Error processing task:', error);
      return false;
    }
  }
}

export default AgenticService.getInstance();
