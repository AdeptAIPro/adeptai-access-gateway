
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import { AgentTask, Agent } from '../types/AgenticTypes';

export class AgenticDatabaseService {
  private tableName = 'agent_tasks';
  private agentsTableName = 'agents';

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

  // Get a single task by ID
  public async getTaskById(taskId: string): Promise<AgentTask | null> {
    try {
      const { data: task, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('id', taskId)
        .single();
      
      if (error) {
        console.error('Error fetching task:', error);
        return null;
      }
      
      return task as AgentTask;
    } catch (error) {
      console.error('Error getting task by ID:', error);
      return null;
    }
  }
}

export default new AgenticDatabaseService();
