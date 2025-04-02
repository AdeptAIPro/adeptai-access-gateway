
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import DashboardLayout from "@/components/DashboardLayout";
import AgenticDashboard from "@/components/agentic-ai/AgenticDashboard";
import AgenticProcessFlow from "@/components/agentic-ai/AgenticProcessFlow";
import AgentTaskCreator from "@/components/agentic-ai/AgentTaskCreator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, Database, RefreshCw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { seedAgenticAIData, ensureAgenticTables } from "@/services/agentic-ai/db/AgenticDatabaseSeeder";

const AgenticAI = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSeeding, setIsSeeding] = useState<boolean>(false);
  const [needsSetup, setNeedsSetup] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  
  useEffect(() => {
    const checkTables = async () => {
      const tablesExist = await ensureAgenticTables();
      setNeedsSetup(!tablesExist);
    };
    
    checkTables();
  }, []);
  
  if (!user) {
    navigate("/login");
    return null;
  }
  
  const handleSeedData = async () => {
    setIsSeeding(true);
    await seedAgenticAIData();
    setIsSeeding(false);
    // Reload the page to refresh data
    window.location.reload();
  };

  return (
    <DashboardLayout title="Agentic AI Platform">
      <div className="space-y-6">
        {needsSetup && (
          <Alert variant="warning" className="mb-4 bg-yellow-50 border-yellow-200">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Database Setup Required</AlertTitle>
            <AlertDescription>
              Your Supabase database needs to be configured with the appropriate tables for Agentic AI.
              Please create the required tables or use the seed button below to see the required schema.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Agentic AI Platform</h2>
            <p className="text-muted-foreground">
              Your AI agents are ready to help with your tasks
            </p>
          </div>
          <Button 
            onClick={handleSeedData} 
            disabled={isSeeding}
            variant="outline"
            className="gap-2"
          >
            {isSeeding ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Database className="h-4 w-4" />}
            {isSeeding ? "Adding Sample Data..." : "Seed Database"}
          </Button>
        </div>
        
        {/* Add the process flow component here */}
        <AgenticProcessFlow />
        
        {/* Add tabs for different sections */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="create">Create New Task</TabsTrigger>
            <TabsTrigger value="dashboard">Task Dashboard</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Task Creator */}
              <AgentTaskCreator />
              
              {/* How it works card */}
              <Card>
                <CardHeader>
                  <CardTitle>How It Works</CardTitle>
                  <CardDescription>Understanding the Agentic AI workflow</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">1. Select Task Type</h3>
                    <p className="text-sm text-muted-foreground">
                      Choose the type of task you want the AI to perform based on your needs.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">2. Choose an Agent</h3>
                    <p className="text-sm text-muted-foreground">
                      Select an AI agent that specializes in the task type you've selected.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">3. Define Your Goal</h3>
                    <p className="text-sm text-muted-foreground">
                      Clearly describe what you want the AI to accomplish with specific details.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">4. Monitor Progress</h3>
                    <p className="text-sm text-muted-foreground">
                      Track your task's status and review results in the dashboard tab.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="dashboard">
            <Card>
              <CardHeader>
                <CardTitle>AI Agent Dashboard</CardTitle>
                <CardDescription>
                  Manage your AI agents and their tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AgenticDashboard />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AgenticAI;
