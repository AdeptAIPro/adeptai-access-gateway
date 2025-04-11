
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { BotIcon } from "lucide-react";
import EnrichmentToggle from "./ai-enrichment/EnrichmentToggle";
import EnrichmentConfigurationForm from "./ai-enrichment/EnrichmentConfigurationForm";
import EnrichmentToolsList from "./ai-enrichment/EnrichmentToolsList";
import EnrichmentComplianceNote from "./ai-enrichment/EnrichmentComplianceNote";

interface AIDataEnrichmentCardProps {
  onEnrichLeads: (source: string) => void;
  onEnrichTalents: (source: string) => void;
}

const AIDataEnrichmentCard: React.FC<AIDataEnrichmentCardProps> = ({
  onEnrichLeads,
  onEnrichTalents
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("leads");
  const [isAutoEnrichEnabled, setIsAutoEnrichEnabled] = useState(false);
  const [isConfiguring, setIsConfiguring] = useState<string | null>(null);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAutoEnrich = () => {
    const newValue = !isAutoEnrichEnabled;
    setIsAutoEnrichEnabled(newValue);
    
    toast({
      title: newValue ? "Auto-enrichment Enabled" : "Auto-enrichment Disabled",
      description: newValue 
        ? "New entries will be automatically enriched with AI data" 
        : "Automatic data enrichment has been turned off",
    });
  };

  const handleConfigure = (toolId: string) => {
    setIsConfiguring(toolId);
    // In a real implementation, this would load existing configuration
  };

  const handleSaveConfig = () => {
    toast({
      title: "Configuration Saved",
      description: "Your integration settings have been updated",
    });
    setIsConfiguring(null);
  };

  const handleEnrich = async (source: string, type: "leads" | "talents") => {
    setIsProcessing(true);
    
    try {
      // This would be a real API call in a production implementation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (type === "leads") {
        onEnrichLeads(source);
      } else {
        onEnrichTalents(source);
      }
    } catch (error) {
      toast({
        title: "Enrichment Failed",
        description: "There was an error enriching your data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BotIcon className="mr-2 h-5 w-5 text-blue-500" />
          AI Data Enrichment
        </CardTitle>
        <CardDescription>
          Enhance your data with free AI enrichment tools
        </CardDescription>
      </CardHeader>
      <CardContent>
        <EnrichmentToggle 
          isEnabled={isAutoEnrichEnabled} 
          onChange={handleAutoEnrich} 
        />

        {isConfiguring && (
          <EnrichmentConfigurationForm
            toolId={isConfiguring}
            webhookUrl={webhookUrl}
            setWebhookUrl={setWebhookUrl}
            onSave={handleSaveConfig}
            onCancel={() => setIsConfiguring(null)}
          />
        )}

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="leads">CRM Leads</TabsTrigger>
            <TabsTrigger value="talents">Talent Database</TabsTrigger>
          </TabsList>
          
          <TabsContent value="leads">
            <EnrichmentToolsList
              type="leads"
              onConfigure={handleConfigure}
              onEnrich={handleEnrich}
              isProcessing={isProcessing}
            />
          </TabsContent>
          
          <TabsContent value="talents">
            <EnrichmentToolsList
              type="talents"
              onConfigure={handleConfigure}
              onEnrich={handleEnrich}
              isProcessing={isProcessing}
            />
          </TabsContent>
        </Tabs>
        
        <EnrichmentComplianceNote />
      </CardContent>
    </Card>
  );
};

export default AIDataEnrichmentCard;
