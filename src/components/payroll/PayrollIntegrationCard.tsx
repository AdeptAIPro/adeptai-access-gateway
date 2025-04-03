
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link as LinkIcon, X as XIcon, Lock, Info, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { doesPlanMeetRequirement, getFeatureRequirement } from "@/utils/planUtils";

interface PayrollIntegrationCardProps {
  id: string;
  name: string;
  description: string;
  connected: boolean;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  onToggleConnection: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

const PayrollIntegrationCard: React.FC<PayrollIntegrationCardProps> = ({
  id,
  name,
  description,
  connected,
  icon: Icon,
  category,
  onToggleConnection,
  onViewDetails,
}) => {
  const { user } = useAuth();
  const userPlan = user?.plan as "free_trial" | "pro" | "business" | "enterprise" | null;
  const [isConnecting, setIsConnecting] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Check if available for user's plan
  const featureRequirement = getFeatureRequirement("payroll_automation");
  const isAvailable = doesPlanMeetRequirement(userPlan, featureRequirement);

  // Handle connection error
  const handleConnectionError = () => {
    setHasError(true);
    toast.error("Failed to connect to integration");
    setTimeout(() => setHasError(false), 5000); // Reset error state after 5 seconds
  };

  // Safe connection toggle
  const handleToggleConnection = async () => {
    if (!isAvailable && !connected) {
      toast.error(`This integration requires a ${featureRequirement.planName}+ plan`);
      return;
    }

    setIsConnecting(true);
    try {
      await onToggleConnection(id);
      toast.success(connected ? 
        `Disconnected from ${name}` : 
        `Successfully connected to ${name}`
      );
    } catch (error) {
      console.error("Connection error:", error);
      handleConnectionError();
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all border-gray-200 dark:border-gray-700">
      <CardHeader className="flex flex-row items-center gap-4 pb-2 bg-gray-50/50 dark:bg-gray-800/50">
        <div className="bg-white dark:bg-gray-700 p-3 rounded-md h-12 w-12 flex items-center justify-center shadow-sm">
          <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-lg flex items-center gap-2">
            {name}
            {connected && (
              <Badge variant="success" className="text-xs ml-2">
                Connected
              </Badge>
            )}
          </CardTitle>
          <CardDescription className="text-xs flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {category}
            </Badge>
            {!isAvailable && !connected && (
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
                {featureRequirement.planName}+ Feature
              </Badge>
            )}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-sm text-muted-foreground mb-4 min-h-[60px]">{description}</p>
        
        <div className="flex gap-2">
          {onViewDetails && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-grow"
              onClick={() => onViewDetails(id)}
            >
              <Info className="h-4 w-4 mr-2" /> Details
            </Button>
          )}
          
          {/* Connection button with error handling */}
          {hasError ? (
            <Button 
              variant="destructive" 
              size="sm"
              className="flex-grow animate-pulse"
              disabled
            >
              <AlertCircle className="mr-2 h-4 w-4" /> Connection Error
            </Button>
          ) : connected ? (
            <Button 
              variant="destructive"
              className="flex-grow"
              onClick={handleToggleConnection}
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
              onClick={handleToggleConnection}
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
                    onClick={handleToggleConnection}
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
                  <p>This integration requires a {featureRequirement.planName}+ plan</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PayrollIntegrationCard;
