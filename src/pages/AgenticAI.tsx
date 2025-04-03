
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import DashboardLayout from "@/components/DashboardLayout";
import AgenticDashboard from "@/components/agentic-ai/AgenticDashboard";
import AgenticProcessFlow from "@/components/agentic-ai/AgenticProcessFlow";
import AgentTaskCreator from "@/components/agentic-ai/AgentTaskCreator";
import HowItWorksCard from "@/components/agentic-ai/task-creator/HowItWorksCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, Database, RefreshCw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { seedAgenticAIData, ensureAgenticTables } from "@/services/agentic-ai/db/AgenticDatabaseSeeder";
import { useIsMobile } from "@/hooks/use-mobile";
import { AgentTask } from "@/services/agentic-ai/types/AgenticTypes";

const AgenticAI = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSeeding, setIsSeeding] = useState<boolean>(false);
  const [needsSetup, setNeedsSetup] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [tasks, setTasks] = useState<AgentTask[]>([]); // Added tasks state
  const isMobile = useIsMobile();
  
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
        <AgenticProcessFlow tasks={tasks} />
        
        {/* Redesigned tabs with better alignment and visual appearance */}
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full"
        >
          <div className="flex justify-center mb-6">
            <TabsList className="flex w-full md:w-2/3 overflow-hidden rounded-lg border-0 shadow-md bg-card">
              <TabsTrigger 
                value="create" 
                className="flex-1 px-4 py-3 text-base font-medium border-r border-border data-[state=active]:bg-adept data-[state=active]:text-white transition-all"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  Create New Task
                </span>
              </TabsTrigger>
              <TabsTrigger 
                value="dashboard"
                className="flex-1 px-4 py-3 text-base font-medium data-[state=active]:bg-adept data-[state=active]:text-white transition-all"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect width="7" height="9" x="3" y="3" rx="1" />
                    <rect width="7" height="5" x="14" y="3" rx="1" />
                    <rect width="7" height="9" x="14" y="12" rx="1" />
                    <rect width="7" height="5" x="3" y="16" rx="1" />
                  </svg>
                  Task Dashboard
                </span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="create">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Task Creator with enhanced visuals */}
              <Card className="border-2 border-adept/30 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-adept/10 to-adept/5 pb-4">
                  <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-adept"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                    Create New Task
                  </CardTitle>
                  <CardDescription>Let our AI agents help you with your tasks</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <AgentTaskCreator />
                </CardContent>
              </Card>
              
              {/* How it works card */}
              <HowItWorksCard />
            </div>
          </TabsContent>
          
          <TabsContent value="dashboard">
            <Card className="border-2 border-adept/30 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-adept/10 to-adept/5">
                <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-adept"
                  >
                    <rect width="7" height="9" x="3" y="3" rx="1" />
                    <rect width="7" height="5" x="14" y="3" rx="1" />
                    <rect width="7" height="9" x="14" y="12" rx="1" />
                    <rect width="7" height="5" x="3" y="16" rx="1" />
                  </svg>
                  AI Agent Dashboard
                </CardTitle>
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
