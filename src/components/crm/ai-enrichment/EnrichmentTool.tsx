
import React from "react";
import { Button } from "@/components/ui/button";

interface EnrichmentToolProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  onConfigure: (toolId: string) => void;
  onEnrich: () => void;
  toolId: string;
  isProcessing: boolean;
}

const EnrichmentTool: React.FC<EnrichmentToolProps> = ({
  name,
  description,
  icon,
  onConfigure,
  onEnrich,
  toolId,
  isProcessing,
}) => {
  return (
    <div className="border rounded-md p-4 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium flex items-center">
            {icon}
            {name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onConfigure(toolId)}
          >
            Configure
          </Button>
          <Button 
            size="sm"
            onClick={onEnrich}
            disabled={isProcessing}
          >
            Enrich Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnrichmentTool;
