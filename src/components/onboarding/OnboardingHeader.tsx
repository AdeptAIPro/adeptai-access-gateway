
import React from "react";
import { OnboardingWorkflow } from "@/services/onboarding/OnboardingService";
import OnboardingWorkflowCreator from "@/components/onboarding/OnboardingWorkflowCreator";

interface OnboardingHeaderProps {
  selectedClientId: string | null;
  selectedWorkflow: OnboardingWorkflow | null;
  viewMode: "workflows" | "integrations";
  onWorkflowCreated: () => void;
}

const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({
  selectedClientId,
  selectedWorkflow,
  viewMode,
  onWorkflowCreated
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Employee Onboarding</h2>
        <p className="text-muted-foreground">
          Manage onboarding workflows for your clients across different workforce sectors
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        {selectedClientId && !selectedWorkflow && viewMode === "workflows" && (
          <OnboardingWorkflowCreator 
            clientId={selectedClientId} 
            onWorkflowCreated={onWorkflowCreated} 
          />
        )}
      </div>
    </div>
  );
};

export default OnboardingHeader;
