
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import { AgentTask, Agent } from '../types/AgenticTypes';

// Helper function to execute database queries
export const executeQuery = async (query: string, params?: any[]): Promise<any[] | null> => {
  try {
    // This is a simplified implementation - in a real app, this would use actual parameterized queries
    console.log(`Executing query: ${query}`);
    
    // For development/demo purposes, we'll simulate database queries
    // In production, this would use actual Supabase queries
    
    if (query.toLowerCase().includes('select') && query.toLowerCase().includes('candidates')) {
      return mockCandidates;
    }
    
    const { data, error } = await supabase.rpc('execute_query', { 
      query_text: query,
      params: params || []
    });
    
    if (error) {
      console.error('Error executing query:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error in executeQuery:', error);
    return null;
  }
};

// Mock candidates for development/demo
const mockCandidates = [
  {
    id: "c1",
    name: "Jane Smith",
    skills: ["JavaScript", "React", "TypeScript", "Node.js"],
    experience: 5,
    location: "San Francisco, CA",
    source: "linkedin"
  },
  {
    id: "c2",
    name: "Michael Johnson",
    skills: ["JavaScript", "Angular", "Java", "Spring Boot"],
    experience: 7,
    location: "New York, NY",
    source: "internal"
  },
  {
    id: "c3",
    name: "Emily Davis",
    skills: ["JavaScript", "Vue.js", "Python", "Django"],
    experience: 3,
    location: "Austin, TX",
    source: "ceipal"
  }
];

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
