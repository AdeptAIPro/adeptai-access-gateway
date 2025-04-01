
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Building2 } from "lucide-react";
import OnboardingWorkflowCreator from "@/components/onboarding/OnboardingWorkflowCreator";

type EmptyStateType = "no-clients" | "no-workflows";

interface OnboardingEmptyStateProps {
  type: EmptyStateType;
  sector?: "healthcare" | "it" | "general" | null;
  clientId?: string;
  onWorkflowCreated?: () => void;
}

const OnboardingEmptyState: React.FC<OnboardingEmptyStateProps> = ({
  type,
  sector,
  clientId,
  onWorkflowCreated
}) => {
  if (type === "no-clients") {
    return (
      <Card>
        <CardContent className="py-8 flex flex-col items-center text-center">
          <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Clients Available</h3>
          <p className="text-muted-foreground max-w-md">
            Add clients to start creating onboarding workflows. Each client can have multiple workflows for different workforce sectors.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  // No workflows empty state
  const sectorText = sector ? sector : "";
  const sectorDescription = sector 
    ? `Create a ${sector}-specific onboarding workflow to get started.`
    : "This client doesn't have any onboarding workflows yet.";

  return (
    <Card>
      <CardContent className="py-8 flex flex-col items-center text-center">
        <UserPlus className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No {sectorText} onboarding workflows</h3>
        <p className="text-muted-foreground max-w-md mb-4">
          {sectorDescription}
        </p>
        {clientId && onWorkflowCreated && (
          <OnboardingWorkflowCreator 
            clientId={clientId} 
            onWorkflowCreated={onWorkflowCreated} 
          />
        )}
      </CardContent>
    </Card>
  );
};

export default OnboardingEmptyState;
