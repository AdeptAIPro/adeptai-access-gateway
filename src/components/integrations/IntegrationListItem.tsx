
import React, { useState } from "react";
import { Link as LinkIcon, X as XIcon, Lock, Info, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IntegrationItem } from "@/types/integration";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/use-auth";
import { 
  isIntegrationAvailableForPlan, 
  getPlanRequirementDisplay,
  getIntegrationConfigurationError
} from "@/services/integrations/IntegrationValidationService";

interface IntegrationListItemProps {
  integration: IntegrationItem;
  onToggleConnection: (id: string) => void;
  isConnecting: boolean;
  onViewDetails?: (integration: IntegrationItem) => void;
}

const IntegrationListItem: React.FC<IntegrationListItemProps> = ({ 
  integration, 
  onToggleConnection, 
  isConnecting,
  onViewDetails
}) => {
  const { user } = useAuth();
  const userPlan = user?.plan as "free_trial" | "pro" | "business" | "enterprise" | null;
  const isAvailable = isIntegrationAvailableForPlan(integration, userPlan);
  const [hasError, setHasError] = useState(false);
  
  // Handle connection error
  const handleConnectionError = () => {
    setHasError(true);
    setTimeout(() => setHasError(false), 5000); // Reset error state after 5 seconds
  };

  // Safe wrapper for connection toggle
  const safeToggleConnection = () => {
    try {
      onToggleConnection(integration.id);
    } catch (error) {
      console.error("Error toggling connection:", error);
      handleConnectionError();
    }
  };

  // Get configuration error if any
  const configError = integration.connected ? getIntegrationConfigurationError(integration) : null;

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-all bg-white dark:bg-gray-800">
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-md h-12 w-12 flex items-center justify-center">
          <integration.icon className="h-6 w-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-base">{integration.name}</h3>
            {integration.connected && !configError && (
              <Badge variant="success" className="text-xs">
                Connected
              </Badge>
            )}
            {integration.connected && configError && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="destructive" className="text-xs flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> Configuration Error
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{configError}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1 max-w-md">{integration.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {integration.category}
          </Badge>
          
          {!isAvailable && !integration.connected && (
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
              {getPlanRequirementDisplay(integration)}
            </Badge>
          )}
        </div>

        <div className="flex gap-2">
          {onViewDetails && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onViewDetails(integration)}
              className="min-w-[80px]"
            >
              <Info className="mr-2 h-4 w-4" /> Details
            </Button>
          )}
          
          {/* Connection button logic with enhanced error handling */}
          {hasError ? (
            <Button 
              variant="destructive" 
              size="sm"
              className="min-w-[120px] animate-pulse"
              disabled
            >
              <AlertCircle className="mr-2 h-4 w-4" /> Connection Error
            </Button>
          ) : integration.connected ? (
            <Button 
              variant="destructive" 
              size="sm"
              onClick={safeToggleConnection}
              className="min-w-[120px]"
              disabled={isConnecting}
            >
              {isConnecting ? (
                <><span className="animate-spin mr-2">◌</span> Processing</>
              ) : (
                <><XIcon className="mr-2 h-4 w-4" /> Disconnect</>
              )}
            </Button>
          ) : isAvailable ? (
            <Button 
              variant="default"
              size="sm"
              onClick={safeToggleConnection}
              className="min-w-[120px]"
              disabled={isConnecting}
            >
              {isConnecting ? (
                <><span className="animate-spin mr-2">◌</span> Processing</>
              ) : (
                <><LinkIcon className="mr-2 h-4 w-4" /> Connect</>
              )}
            </Button>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="min-w-[120px] opacity-80"
                    onClick={safeToggleConnection}
                    disabled={isConnecting}
                  >
                    {isConnecting ? (
                      <><span className="animate-spin mr-2">◌</span> Processing</>
                    ) : (
                      <><Lock className="mr-2 h-4 w-4" /> Upgrade</>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This integration requires a {getPlanRequirementDisplay(integration)} plan</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntegrationListItem;
