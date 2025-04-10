
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { connectOnboardingTool, OnboardingTool } from "@/services/onboarding/OnboardingService";
import { useToast } from "@/hooks/use-toast";
import IntegrationConnectDialog from "./integrations/IntegrationConnectDialog";
import ConnectedToolCard from "./integrations/ConnectedToolCard";
import EmptyIntegrationsState from "./integrations/EmptyIntegrationsState";
import AutomatedOnboardingCard from "./integrations/AutomatedOnboardingCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [automationActivated, setAutomationActivated] = useState(false);
  const [sector, setSector] = useState<"healthcare" | "it" | "general">("general");
  const { toast } = useToast();

  const handleToolConnection = async () => {
    toast({
      title: "Integration connected",
      description: "Successfully connected the integration tool",
    });
    onToolConnected();
  };

  const handleActivateAutomation = () => {
    setAutomationActivated(true);
    toast({
      title: "Automation Activated",
      description: `${sector.charAt(0).toUpperCase() + sector.slice(1)} onboarding automation is now active.`,
      variant: "default",
    });
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
      
      <Tabs defaultValue="tools" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tools">Integration Tools</TabsTrigger>
          <TabsTrigger value="automation">AI Automation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tools">
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
        </TabsContent>
        
        <TabsContent value="automation">
          <div className="space-y-4">
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-sm font-medium">Select sector:</span>
              <div className="flex space-x-2">
                <Button 
                  variant={sector === "general" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSector("general")}
                >
                  General
                </Button>
                <Button 
                  variant={sector === "healthcare" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSector("healthcare")}
                >
                  Healthcare
                </Button>
                <Button 
                  variant={sector === "it" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSector("it")}
                >
                  IT
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AutomatedOnboardingCard 
                clientId={clientId}
                sector={sector}
                onActivate={handleActivateAutomation}
                isActivated={automationActivated}
              />
              
              <div className="border rounded-lg p-6 space-y-4">
                <h3 className="font-medium">Automation Benefits</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-800 rounded-full p-1 mr-2 text-xs">1</span>
                    <span>Reduces onboarding time by up to 80%</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-800 rounded-full p-1 mr-2 text-xs">2</span>
                    <span>Eliminates manual paperwork and follow-ups</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-800 rounded-full p-1 mr-2 text-xs">3</span>
                    <span>Ensures compliance with industry regulations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-800 rounded-full p-1 mr-2 text-xs">4</span>
                    <span>Improves new hire experience and satisfaction</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

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
