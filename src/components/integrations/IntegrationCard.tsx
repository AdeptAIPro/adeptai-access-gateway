
import React from "react";
import { Link as LinkIcon, X as XIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IntegrationItem } from "@/types/integration";

interface IntegrationCardProps {
  integration: IntegrationItem;
  onToggleConnection: (id: string) => void;
}

const IntegrationCardProps: React.FC<IntegrationCardProps> = ({ integration, onToggleConnection }) => {
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
          <CardDescription className="text-xs">{integration.category}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-sm text-muted-foreground mb-4 min-h-[60px]">{integration.description}</p>
        <Button 
          variant={integration.connected ? "destructive" : "default"}
          className="w-full"
          onClick={() => onToggleConnection(integration.id)}
        >
          {integration.connected ? (
            <>
              <XIcon className="mr-2 h-4 w-4" /> Disconnect
            </>
          ) : (
            <>
              <LinkIcon className="mr-2 h-4 w-4" /> Connect
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default IntegrationCardProps;
