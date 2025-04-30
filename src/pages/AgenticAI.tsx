import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useCredentials } from "@/context/CredentialsContext";
import DashboardLayout from "@/components/DashboardLayout";
import AgenticDashboard from "@/components/agentic-ai/AgenticDashboard";
import AgenticProcessFlow from "@/components/agentic-ai/AgenticProcessFlow";
import AgentTaskCreator from "@/components/agentic-ai/AgentTaskCreator";
import HowItWorksCard from "@/components/agentic-ai/task-creator/HowItWorksCard";
import AgenticCredentialsForm from "@/components/agentic-ai/setup/AgenticCredentialsForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, Database, RefreshCcw, KeyRound, CheckCircle } from "@/utils/icon-polyfill";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { seedAgenticAIData, ensureAgenticTables } from "@/services/agentic-ai/db/AgenticDatabaseSeeder";
import { useIsMobile } from "@/hooks/use-mobile";
import { AgentTask } from '@/types/agent-task';
import { toast } from "sonner";

// Define AppCredentials type to match the expected shape
interface AppCredentials {
  openai?: {
    apiKey: string;
  };
  aws?: {
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
  };
  [key: string]: any;
}

const AgenticAI = () => {
  const { user } = useAuth();
  const { credentials, setCredentials, isBackendReady, checkBackendStatus } = useCredentials();
  const navigate = useNavigate();
  const [isSeeding, setIsSeeding] = useState<boolean>(false);
  const [needsSetup, setNeedsSetup] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("setup");
  const [tasks, setTasks] = useState<AgentTask[]>([]);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (isBackendReady && activeTab === "setup") {
      setActiveTab("dashboard");
    }
    
    const checkTables = async () => {
      const tablesExist = await ensureAgenticTables();
      setNeedsSetup(!tablesExist);
    };
    
    if (isBackendReady) {
      checkTables();
    } else {
      setNeedsSetup(true);
    }
  }, [isBackendReady, activeTab]);
  
  if (!user) {
    navigate("/login");
    return null;
  }
  
  const handleSeedData = async () => {
    setIsSeeding(true);
    await seedAgenticAIData();
    setIsSeeding(false);
    await checkBackendStatus();
    toast.success("Sample data added successfully");
  };
  
  const handleCredentialsSet = (newCredentials: AppCredentials) => {
    setCredentials(newCredentials);
    checkBackendStatus().then((isReady) => {
      if (isReady) {
        setActiveTab("dashboard");
        toast.success("Backend connection established successfully!");
      }
    });
  };

  return (
    <DashboardLayout title="Agentic AI Platform">
      <div className="space-y-6">
        {needsSetup && (
          <Alert variant="warning" className="mb-4 bg-yellow-50 border-yellow-200">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>API Configuration Required</AlertTitle>
            <AlertDescription>
              {!credentials 
                ? "Please configure your OpenAI API key and AWS credentials to enable AI agent functionality." 
                : "Your AWS DynamoDB tables need to be configured for Agentic AI. Use the seed button to create the required tables."
              }
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
          <div className="flex items-center gap-2">
            {isBackendReady && (
              <div className="flex items-center text-sm text-green-600 mr-2">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Backend Connected</span>
              </div>
            )}
            <Button 
              onClick={handleSeedData} 
              disabled={isSeeding || !isBackendReady}
              variant="outline"
              className="gap-2"
            >
              {isSeeding ? <RefreshCcw className="h-4 w-4 animate-spin" /> : <Database className="h-4 w-4" />}
              {isSeeding ? "Adding Sample Data..." : "Seed Database"}
            </Button>
          </div>
        </div>
        
        {isBackendReady && (
          <AgenticProcessFlow tasks={tasks} />
        )}
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full"
        >
          <div className="flex justify-center mb-6">
            <TabsList className="flex w-full md:w-2/3 overflow-hidden rounded-lg border-0 shadow-md bg-card">
              <TabsTrigger 
                value="setup" 
                className="flex-1 px-4 py-3 text-base font-medium border-r border-border data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
              >
                <span className="flex items-center justify-center gap-2">
                  <KeyRound className="h-5 w-5" />
                  API Setup
                </span>
              </TabsTrigger>
              <TabsTrigger 
                value="create" 
                className="flex-1 px-4 py-3 text-base font-medium border-r border-border data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
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
                className="flex-1 px-4 py-3 text-base font-medium data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
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
          
          <TabsContent value="setup">
            <div className="grid gap-6 md:grid-cols-2">
              <AgenticCredentialsForm 
                onCredentialsSet={handleCredentialsSet}
                initialCredentials={credentials || undefined}
              />
              <HowItWorksCard />
            </div>
          </TabsContent>
          
          <TabsContent value="create">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-2 border-primary/30 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 pb-4">
                  <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
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
              <HowItWorksCard />
            </div>
          </TabsContent>
          
          <TabsContent value="dashboard">
            <Card className="border-2 border-primary/30 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
                <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
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
