
import React from "react";
import { OnboardingWorkflow } from "@/services/onboarding/OnboardingService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkflowList from "./WorkflowList";

interface OnboardingWorkflowsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  filteredWorkflows: OnboardingWorkflow[];
  onSelectWorkflow: (workflow: OnboardingWorkflow) => void;
  selectedClientId: string;
  onWorkflowCreated: () => void;
}

const OnboardingWorkflows: React.FC<OnboardingWorkflowsProps> = ({
  activeTab,
  setActiveTab,
  filteredWorkflows,
  onSelectWorkflow,
  selectedClientId,
  onWorkflowCreated
}) => {
  return (
    <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="all">All Workflows</TabsTrigger>
        <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
        <TabsTrigger value="it">IT</TabsTrigger>
        <TabsTrigger value="general">General</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="space-y-6">
        <WorkflowList
          workflows={filteredWorkflows}
          onSelectWorkflow={onSelectWorkflow}
          selectedClientId={selectedClientId}
          onWorkflowCreated={onWorkflowCreated}
          sectorFilter={null}
        />
      </TabsContent>

      <TabsContent value="healthcare" className="space-y-6">
        <WorkflowList
          workflows={filteredWorkflows}
          onSelectWorkflow={onSelectWorkflow}
          selectedClientId={selectedClientId}
          onWorkflowCreated={onWorkflowCreated}
          sectorFilter="healthcare"
        />
      </TabsContent>

      <TabsContent value="it" className="space-y-6">
        <WorkflowList
          workflows={filteredWorkflows}
          onSelectWorkflow={onSelectWorkflow}
          selectedClientId={selectedClientId}
          onWorkflowCreated={onWorkflowCreated}
          sectorFilter="it"
        />
      </TabsContent>

      <TabsContent value="general" className="space-y-6">
        <WorkflowList
          workflows={filteredWorkflows}
          onSelectWorkflow={onSelectWorkflow}
          selectedClientId={selectedClientId}
          onWorkflowCreated={onWorkflowCreated}
          sectorFilter="general"
        />
      </TabsContent>
    </Tabs>
  );
};

export default OnboardingWorkflows;
