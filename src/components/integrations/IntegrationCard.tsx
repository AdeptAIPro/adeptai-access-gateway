
import React from "react";
import { Link as LinkIcon, X as XIcon, Lock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IntegrationItem } from "@/types/integration";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/use-auth";
import { isIntegrationAvailableForPlan } from "@/services/integrations/IntegrationValidationService";

interface IntegrationCardProps {
  integration: IntegrationItem;
  onToggleConnection: (id: string) => void;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ integration, onToggleConnection }) => {
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
    <Card className="overflow-hidden hover:shadow-md transition-all border-gray-200 dark:border-gray-700">
      <CardHeader className="flex flex-row items-center gap-4 pb-2 bg-gray-50/50 dark:bg-gray-800/50">
        <div className="bg-white dark:bg-gray-700 p-3 rounded-md h-12 w-12 flex items-center justify-center shadow-sm">
          <integration.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-lg flex items-center gap-2">
            {integration.name}
            {integration.connected && 
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs ml-2">
                Connected
              </Badge>
            }
          </CardTitle>
          <CardDescription className="text-xs flex items-center gap-2">
            {integration.category}
            {!isAvailable && !integration.connected && (
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
                {getPlanRequirement()}
              </Badge>
            )}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-sm text-muted-foreground mb-4 min-h-[60px]">{integration.description}</p>
        
        {/* Only show connection button logic based on both availability and connection status */}
        {integration.connected ? (
          <Button 
            variant="destructive"
            className="w-full"
            onClick={() => onToggleConnection(integration.id)}
          >
            <XIcon className="mr-2 h-4 w-4" /> Disconnect
          </Button>
        ) : isAvailable ? (
          <Button 
            variant="default"
            className="w-full"
            onClick={() => onToggleConnection(integration.id)}
          >
            <LinkIcon className="mr-2 h-4 w-4" /> Connect
          </Button>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full opacity-80"
                  onClick={() => onToggleConnection(integration.id)}
                >
                  <Lock className="mr-2 h-4 w-4" /> Upgrade to Connect
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>This integration requires a {getPlanRequirement()} plan or higher</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </CardContent>
    </Card>
  );
};

export default IntegrationCard;
