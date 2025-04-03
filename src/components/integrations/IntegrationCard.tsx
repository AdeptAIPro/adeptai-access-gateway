
import React, { useState } from "react";
import { Link as LinkIcon, X as XIcon, Lock, Info, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { toast } from "sonner";

interface IntegrationCardProps {
  integration: IntegrationItem;
  onToggleConnection: (id: string) => void;
  isConnecting: boolean;
  onViewDetails?: (integration: IntegrationItem) => void;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ 
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
    toast.error("Failed to connect to integration");
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
    <Card className="overflow-hidden hover:shadow-md transition-all border-gray-200 dark:border-gray-700">
      <CardHeader className="flex flex-row items-center gap-4 pb-2 bg-gray-50/50 dark:bg-gray-800/50">
        <div className="bg-white dark:bg-gray-700 p-3 rounded-md h-12 w-12 flex items-center justify-center shadow-sm">
          <integration.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-lg flex items-center gap-2">
            {integration.name}
            {integration.connected && !configError && 
              <Badge variant="success" className="text-xs ml-2">
                Connected
              </Badge>
            }
            {integration.connected && configError && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="destructive" className="text-xs ml-2 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> Error
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{configError}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </CardTitle>
          <CardDescription className="text-xs flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {integration.category}
            </Badge>
            {!isAvailable && !integration.connected && (
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
                {getPlanRequirementDisplay(integration)}
              </Badge>
            )}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-sm text-muted-foreground mb-4 min-h-[60px]">{integration.description}</p>
        
        <div className="flex gap-2">
          {onViewDetails && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-grow"
              onClick={() => onViewDetails(integration)}
            >
              <Info className="h-4 w-4 mr-2" /> Details
            </Button>
          )}
          
          {/* Connection button logic enhanced with error handling */}
          {hasError ? (
            <Button 
              variant="destructive" 
              size="sm"
              className="flex-grow animate-pulse"
              disabled
            >
              <AlertCircle className="mr-2 h-4 w-4" /> Connection Error
            </Button>
          ) : integration.connected ? (
            <Button 
              variant="destructive"
              className="flex-grow"
              onClick={safeToggleConnection}
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
              className="flex-grow"
              onClick={safeToggleConnection}
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
                    className="flex-grow opacity-80"
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
      </CardContent>
    </Card>
  );
};

export default IntegrationCard;
