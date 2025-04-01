
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import DashboardLayout from "@/components/DashboardLayout";
import AgenticDashboard from "@/components/agentic-ai/AgenticDashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, Database, RefreshCw } from "lucide-react";
import { seedAgenticAIData, ensureAgenticTables } from "@/services/agentic-ai/db/AgenticDatabaseSeeder";

const AgenticAI = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSeeding, setIsSeeding] = useState<boolean>(false);
  const [needsSetup, setNeedsSetup] = useState<boolean>(false);
  
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
      </div>
    </DashboardLayout>
  );
};

export default AgenticAI;
