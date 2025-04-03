
import React from "react";
import { Link as LinkIcon, X as XIcon, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IntegrationItem } from "@/types/integration";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/use-auth";
import { isIntegrationAvailableForPlan } from "@/services/integrations/IntegrationValidationService";

interface IntegrationListItemProps {
  integration: IntegrationItem;
  onToggleConnection: (id: string) => void;
}

const IntegrationListItem: React.FC<IntegrationListItemProps> = ({ integration, onToggleConnection }) => {
  const { user } = useAuth();
  const userPlan = user?.plan as "free_trial" | "pro" | "business" | "enterprise" | null;
  const isAvailable = isIntegrationAvailableForPlan(integration, userPlan);

  const getPlanRequirement = () => {
    if (integration.category === "Free Job Posting") {
      return "Free";
    } else if (integration.category === "Productivity") {
      return "Free Trial+";
    } else if (["Social", "CRM & HRMS"].includes(integration.category)) {
      return "Pro+";
    } else {
      return "Business+";
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-all bg-white dark:bg-gray-800">
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-md h-12 w-12 flex items-center justify-center">
          <integration.icon className="h-6 w-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-base">{integration.name}</h3>
            {integration.connected && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Connected
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1 max-w-md">{integration.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="text-xs">
          {integration.category}
          {!isAvailable && !integration.connected && (
            <span className="ml-1 text-amber-600">• {getPlanRequirement()}</span>
          )}
        </Badge>
        
        {integration.connected ? (
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => onToggleConnection(integration.id)}
            className="min-w-[120px]"
          >
            <XIcon className="mr-2 h-4 w-4" /> Disconnect
          </Button>
        ) : isAvailable ? (
          <Button 
            variant="default"
            size="sm"
            onClick={() => onToggleConnection(integration.id)}
            className="min-w-[120px]"
          >
            <LinkIcon className="mr-2 h-4 w-4" /> Connect
          </Button>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="min-w-[120px] opacity-80"
                  onClick={() => onToggleConnection(integration.id)}
                >
                  <Lock className="mr-2 h-4 w-4" /> Upgrade
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>This integration requires a {getPlanRequirement()} plan or higher</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
};

export default IntegrationListItem;
