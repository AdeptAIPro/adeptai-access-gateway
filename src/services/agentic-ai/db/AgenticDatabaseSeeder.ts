
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import { Agent } from "../AgenticService";

export const ensureAgenticTables = async (): Promise<boolean> => {
  try {
    // Check if the agents table exists
    const { error: checkAgentsError } = await supabase
      .from('agents')
      .select('count')
      .limit(1);
      
    if (checkAgentsError && checkAgentsError.message.includes('does not exist')) {
      console.log("Agents table doesn't exist. Creating schema...");
      return false;
    }
    
    // Check if the agent_tasks table exists
    const { error: checkTasksError } = await supabase
      .from('agent_tasks')
      .select('count')
      .limit(1);
      
    if (checkTasksError && checkTasksError.message.includes('does not exist')) {
      console.log("Agent tasks table doesn't exist. Creating schema...");
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error checking Agentic AI tables:", error);
    return false;
  }
};

export const seedAgenticAIData = async (): Promise<boolean> => {
  try {
    toast({
      title: "Seeding Data",
      description: "Creating Agentic AI sample data...",
    });
    
    // First check if tables exist
    const tablesExist = await ensureAgenticTables();
    
    if (!tablesExist) {
      toast({
        title: "Database Setup Required",
        description: "Please create the necessary tables in your Supabase project.",
        variant: "default",
      });
      
      // Return the SQL to create the tables - in a real application this would
      // execute the SQL directly, but for this demonstration we'll just show what to create
      console.log("Create the following tables in your Supabase project:");
      console.log(`
        CREATE TABLE agents (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name TEXT NOT NULL,
          description TEXT,
          type TEXT NOT NULL,
          capabilities TEXT[] NOT NULL,
          parameters JSONB DEFAULT '{}'::jsonb,
          status TEXT DEFAULT 'active',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE agent_tasks (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          task_type TEXT NOT NULL,
          status TEXT DEFAULT 'pending',
          goal TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          user_id UUID NOT NULL,
          agent_id UUID NOT NULL REFERENCES agents(id),
          result JSONB,
          error TEXT,
          priority TEXT DEFAULT 'medium',
          deadline TIMESTAMP WITH TIME ZONE,
          params JSONB DEFAULT '{}'::jsonb
        );
        
        CREATE INDEX idx_agent_tasks_user_id ON agent_tasks(user_id);
        CREATE INDEX idx_agent_tasks_status ON agent_tasks(status);
      `);
      
      // Since tables don't exist, let's simulate creating mock agents for testing purposes
      const mockAgents = createMockAgents();
      console.log("Created mock agents for testing:", mockAgents);
      
      return false;
    }
    
    // Insert sample agents
    const sampleAgents: Omit<Agent, 'id' | 'createdAt'>[] = [
      {
        name: "TalentFinder AI",
        description: "Specialized AI agent for finding and filtering talent from multiple sources",
        type: "talent",
        capabilities: ["talent-search", "talent-matching", "cross-source-talent-intelligence"],
        parameters: {},
        status: "active"
      },
      {
        name: "PayrollMaster AI",
        description: "AI agent that handles payroll processing with tax optimization capabilities",
        type: "finance",
        capabilities: ["payroll-processing"],
        parameters: {},
        status: "active"
      },
      {
        name: "ComplianceGuard AI",
        description: "AI agent that monitors and ensures compliance with regulations",
        type: "legal",
        capabilities: ["compliance-check"],
        parameters: {},
        status: "active" 
      },
      {
        name: "InsightsEngine AI",
        description: "AI agent that generates insights from analytics data",
        type: "analytics",
        capabilities: ["analytics-insight", "skills-recommendation"],
        parameters: {},
        status: "active"
      },
      {
        name: "OnboardingAssistant AI",
        description: "AI agent that customizes and manages employee onboarding processes",
        type: "hr",
        capabilities: ["onboarding-customization"],
        parameters: {},
        status: "active"
      }
    ];
    
    console.log("Attempting to seed agents with these capabilities:", 
      sampleAgents.map(a => ({ name: a.name, capabilities: a.capabilities })));
    
    // Insert agents if they don't exist
    for (const agent of sampleAgents) {
      // Check if an agent with the same name exists
      const { data: existingAgents, error: checkError } = await supabase
        .from('agents')
        .select('id')
        .eq('name', agent.name);
      
      if (checkError) {
        console.error("Error checking for existing agent:", checkError);
        continue;
      }
      
      if (existingAgents && existingAgents.length === 0) {
        // Agent doesn't exist, insert it
        const { error: insertError } = await supabase
          .from('agents')
          .insert([{
            ...agent,
            created_at: new Date().toISOString()
          }]);
          
        if (insertError) {
          console.error("Error inserting agent:", insertError);
        } else {
          console.log(`Successfully inserted agent: ${agent.name}`);
        }
      } else {
        console.log(`Agent ${agent.name} already exists, updating capabilities...`);
        
        // Update the existing agent's capabilities to ensure they match our expected values
        if (existingAgents && existingAgents.length > 0) {
          const { error: updateError } = await supabase
            .from('agents')
            .update({
              capabilities: agent.capabilities
            })
            .eq('name', agent.name);
            
          if (updateError) {
            console.error(`Error updating agent ${agent.name} capabilities:`, updateError);
          } else {
            console.log(`Updated capabilities for agent: ${agent.name}`);
          }
        }
      }
    }
    
    toast({
      title: "Data Seeded",
      description: "Agentic AI sample data has been created.",
    });
    
    return true;
  } catch (error) {
    console.error("Error seeding Agentic AI data:", error);
    toast({
      title: "Error",
      description: "Failed to seed Agentic AI data.",
      variant: "destructive",
    });
    return false;
  }
};

// Create mock agents for testing when database is not connected
function createMockAgents(): Agent[] {
  return [
    {
      id: "mock-agent-1",
      name: "TalentFinder AI",
      description: "Specialized AI agent for finding and filtering talent from multiple sources",
      type: "talent",
      capabilities: ["talent-search", "talent-matching", "cross-source-talent-intelligence"],
      parameters: {},
      status: "active",
      createdAt: new Date().toISOString()
    },
    {
      id: "mock-agent-2",
      name: "PayrollMaster AI",
      description: "AI agent that handles payroll processing with tax optimization capabilities",
      type: "finance",
      capabilities: ["payroll-processing"],
      parameters: {},
      status: "active",
      createdAt: new Date().toISOString()
    },
    {
      id: "mock-agent-3",
      name: "ComplianceGuard AI",
      description: "AI agent that monitors and ensures compliance with regulations",
      type: "legal",
      capabilities: ["compliance-check"],
      parameters: {},
      status: "active",
      createdAt: new Date().toISOString()
    }
  ];
}
