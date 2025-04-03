
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkflowBuilder from "@/components/workflows/WorkflowBuilder";
import WorkflowTemplates from "@/components/workflows/WorkflowTemplates";
import WorkflowList from "@/components/workflows/WorkflowList";
import WorkflowPolicies from "@/components/workflows/WorkflowPolicies";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

const Workflows = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("my-workflows");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateNew = () => {
    setIsCreating(true);
    setActiveTab("create");
    toast.success("Starting a new workflow");
  };

  return (
    <DashboardLayout title="Workflow Management">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Enterprise Workflow Management
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Create, manage, and automate business processes and approval workflows
            </p>
          </div>
          
          <Button onClick={handleCreateNew} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create New Workflow
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="my-workflows">My Workflows</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="create">Create Workflow</TabsTrigger>
            <TabsTrigger value="policies">Organization Policies</TabsTrigger>
          </TabsList>
          
          <TabsContent value="my-workflows">
            <WorkflowList onCreateNew={handleCreateNew} />
          </TabsContent>
          
          <TabsContent value="templates">
            <WorkflowTemplates onSelectTemplate={() => {
              setIsCreating(true);
              setActiveTab("create");
            }} />
          </TabsContent>
          
          <TabsContent value="create">
            <WorkflowBuilder 
              isCreating={isCreating} 
              onSave={() => {
                setIsCreating(false);
                setActiveTab("my-workflows");
                toast.success("Workflow saved successfully!");
              }} 
              onCancel={() => {
                setIsCreating(false);
                setActiveTab("my-workflows");
              }}
            />
          </TabsContent>

          <TabsContent value="policies">
            <WorkflowPolicies />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Workflows;
