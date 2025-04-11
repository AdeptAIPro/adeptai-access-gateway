
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";

interface EnrichmentConfigurationFormProps {
  toolId: string | null;
  webhookUrl: string;
  setWebhookUrl: (url: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const EnrichmentConfigurationForm: React.FC<EnrichmentConfigurationFormProps> = ({
  toolId,
  webhookUrl,
  setWebhookUrl,
  onSave,
  onCancel,
}) => {
  if (!toolId) return null;

  return (
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
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={onSave}>
              Save Configuration
            </Button>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default EnrichmentConfigurationForm;
