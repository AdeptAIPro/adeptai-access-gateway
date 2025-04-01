
import React from "react";
import { OnboardingWorkflow } from "@/services/onboarding/OnboardingService";
import OnboardingWorkflowCard from "../OnboardingWorkflowCard";
import OnboardingEmptyState from "../OnboardingEmptyState";

interface WorkflowListProps {
  workflows: OnboardingWorkflow[];
  onSelectWorkflow: (workflow: OnboardingWorkflow) => void;
  selectedClientId: string;
  onWorkflowCreated: () => void;
  sectorFilter: "healthcare" | "it" | "general" | null;
}

const WorkflowList: React.FC<WorkflowListProps> = ({
  workflows,
  onSelectWorkflow,
  selectedClientId,
  onWorkflowCreated,
  sectorFilter
}) => {
  const displayName = sectorFilter ? `${sectorFilter} ` : "";
  
  return workflows.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {workflows.map(workflow => (
        <OnboardingWorkflowCard 
          key={workflow.id} 
          workflow={workflow} 
          onClick={() => onSelectWorkflow(workflow)}
        />
      ))}
    </div>
  ) : (
    <OnboardingEmptyState 
      type="no-workflows"
      sector={sectorFilter}
      clientId={selectedClientId}
      onWorkflowCreated={onWorkflowCreated}
    />
  );
};

export default WorkflowList;
