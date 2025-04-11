
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, BotIcon, Globe, Database, UploadCloud, AlertCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
      
      toast({
        title: "Data Enrichment Complete",
        description: `Successfully enriched data using ${source}`,
      });
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
        <div className="flex items-center space-x-2 p-4 bg-muted/40 rounded-lg border mb-4">
          <Info className="h-5 w-5 text-blue-500" />
          <h3 className="font-medium">Automatic Data Enrichment</h3>
          <div className="ml-auto flex items-center space-x-2">
            <Label htmlFor="auto-enrich">
              {isAutoEnrichEnabled ? "Enabled" : "Disabled"}
            </Label>
            <Switch
              id="auto-enrich"
              checked={isAutoEnrichEnabled}
              onCheckedChange={handleAutoEnrich}
            />
          </div>
        </div>

        {isConfiguring && (
          <Alert className="mb-4">
            <Info className="h-4 w-4" />
            <AlertTitle>Configure Integration</AlertTitle>
            <AlertDescription>
              <div className="mt-2 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL or API Key</Label>
                  <Input 
                    id="webhook-url" 
                    placeholder="Enter webhook URL or API key" 
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    For free tools, you can usually obtain a free API key by signing up on their website.
                  </p>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsConfiguring(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveConfig}>
                    Save Configuration
                  </Button>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="leads">CRM Leads</TabsTrigger>
            <TabsTrigger value="talents">Talent Database</TabsTrigger>
          </TabsList>
          
          <TabsContent value="leads" className="space-y-4">
            <div className="border rounded-md p-4 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium flex items-center">
                    <Globe className="mr-2 h-4 w-4 text-green-500" />
                    Coldify AI (Free)
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    AI-powered lead generation from company websites and social media
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleConfigure("coldify")}
                  >
                    Configure
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => handleEnrich("Coldify AI", "leads")}
                    disabled={isProcessing}
                  >
                    Enrich Data
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-4 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium flex items-center">
                    <Database className="mr-2 h-4 w-4 text-purple-500" />
                    Hunter.io (Freemium)
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Find and verify professional email addresses (50 free requests/month)
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleConfigure("hunter")}
                  >
                    Configure
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => handleEnrich("Hunter.io", "leads")}
                    disabled={isProcessing}
                  >
                    Enrich Data
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-4 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium flex items-center">
                    <UploadCloud className="mr-2 h-4 w-4 text-blue-500" />
                    LeadGPT (Open Source)
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Open-source AI for enriching leads with market intelligence
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleConfigure("leadgpt")}
                  >
                    Configure
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => handleEnrich("LeadGPT", "leads")}
                    disabled={isProcessing}
                  >
                    Enrich Data
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="talents" className="space-y-4">
            <div className="border rounded-md p-4 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium flex items-center">
                    <Globe className="mr-2 h-4 w-4 text-blue-500" />
                    OpenResume.ai (Free)
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Extract structured data from candidate resumes and online profiles
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleConfigure("openresume")}
                  >
                    Configure
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => handleEnrich("OpenResume.ai", "talents")}
                    disabled={isProcessing}
                  >
                    Enrich Data
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-4 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium flex items-center">
                    <Database className="mr-2 h-4 w-4 text-green-500" />
                    TalentHarvest (Open Source)
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Ethically scrape talent data from job boards and professional networks
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleConfigure("talentharvest")}
                  >
                    Configure
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => handleEnrich("TalentHarvest", "talents")}
                    disabled={isProcessing}
                  >
                    Enrich Data
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-4 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium flex items-center">
                    <UploadCloud className="mr-2 h-4 w-4 text-amber-500" />
                    SkillGraph (Freemium)
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    AI-powered skill identification and validation (100 free lookups/month)
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleConfigure("skillgraph")}
                  >
                    Configure
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => handleEnrich("SkillGraph", "talents")}
                    disabled={isProcessing}
                  >
                    Enrich Data
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <Alert className="mt-4 bg-amber-50 border-amber-200">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-800">Compliance Note</AlertTitle>
          <AlertDescription className="text-amber-700">
            Ensure all data collection complies with privacy regulations like GDPR and CCPA. 
            These tools should be used ethically and in accordance with their terms of service.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default AIDataEnrichmentCard;
