
import React from "react";
import { OnboardingClient, OnboardingWorkflow, OnboardingTool } from "@/services/onboarding/OnboardingService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OnboardingWorkflows from "./OnboardingWorkflows";
import OnboardingIntegrations from "../OnboardingIntegrations";

interface OnboardingContentProps {
  selectedClient: OnboardingClient;
  viewMode: "workflows" | "integrations";
  setViewMode: (mode: "workflows" | "integrations") => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  filteredWorkflows: OnboardingWorkflow[];
  onSelectWorkflow: (workflow: OnboardingWorkflow) => void;
  selectedClientId: string;
  onWorkflowCreated: () => void;
  availableTools: OnboardingTool[];
  connectedTools: OnboardingTool[];
  onToolConnected: () => void;
}

const OnboardingContent: React.FC<OnboardingContentProps> = ({
  selectedClient,
  viewMode,
  setViewMode,
  activeTab,
  setActiveTab,
  filteredWorkflows,
  onSelectWorkflow,
  selectedClientId,
  onWorkflowCreated,
  availableTools,
  connectedTools,
  onToolConnected
}) => {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="workflows" value={viewMode} onValueChange={(value) => setViewMode(value as "workflows" | "integrations")}>
        <TabsList>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="workflows" className="space-y-6">
          <OnboardingWorkflows
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            filteredWorkflows={filteredWorkflows}
            onSelectWorkflow={onSelectWorkflow}
            selectedClientId={selectedClientId}
            onWorkflowCreated={onWorkflowCreated}
          />
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <OnboardingIntegrations
            clientId={selectedClientId}
            availableTools={availableTools}
            connectedTools={connectedTools}
            onToolConnected={onToolConnected}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OnboardingContent;
