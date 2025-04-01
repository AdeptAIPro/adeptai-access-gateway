
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { connectOnboardingTool, OnboardingTool } from "@/services/onboarding/OnboardingService";
import { useToast } from "@/hooks/use-toast";
import IntegrationConnectDialog from "./integrations/IntegrationConnectDialog";
import ConnectedToolCard from "./integrations/ConnectedToolCard";
import EmptyIntegrationsState from "./integrations/EmptyIntegrationsState";

interface OnboardingIntegrationsProps {
  clientId: string;
  availableTools: OnboardingTool[];
  connectedTools: OnboardingTool[];
  onToolConnected: () => void;
}

const OnboardingIntegrations: React.FC<OnboardingIntegrationsProps> = ({
  clientId,
  availableTools,
  connectedTools,
  onToolConnected
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleToolConnection = async () => {
    toast({
      title: "Integration connected",
      description: "Successfully connected the integration tool",
    });
    onToolConnected();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Onboarding Integrations</h3>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Connect Tool
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {connectedTools.length > 0 ? (
          connectedTools.map(tool => (
            <ConnectedToolCard 
              key={tool.id} 
              tool={tool} 
              onConfigure={() => console.log(`Configure ${tool.name}`)}
            />
          ))
        ) : (
          <EmptyIntegrationsState onConnect={() => setIsDialogOpen(true)} />
        )}
      </div>

      <IntegrationConnectDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        availableTools={availableTools}
        clientId={clientId}
        onToolConnected={handleToolConnection}
      />
    </div>
  );
};

export default OnboardingIntegrations;
