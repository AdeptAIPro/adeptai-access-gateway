
import React from "react";
import { Info } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface EnrichmentToggleProps {
  isEnabled: boolean;
  onChange: () => void;
}

const EnrichmentToggle: React.FC<EnrichmentToggleProps> = ({
  isEnabled,
  onChange,
}) => {
  return (
    <div className="flex items-center space-x-2 p-4 bg-muted/40 rounded-lg border mb-4">
      <Info className="h-5 w-5 text-blue-500" />
      <h3 className="font-medium">Automatic Data Enrichment</h3>
      <div className="ml-auto flex items-center space-x-2">
        <Label htmlFor="auto-enrich">
          {isEnabled ? "Enabled" : "Disabled"}
        </Label>
        <Switch
          id="auto-enrich"
          checked={isEnabled}
          onCheckedChange={onChange}
        />
      </div>
    </div>
  );
};

export default EnrichmentToggle;
