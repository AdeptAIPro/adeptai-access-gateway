
import React from "react";
import { Link as LinkIcon, X as XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IntegrationItem } from "@/types/integration";

interface IntegrationListItemProps {
  integration: IntegrationItem;
  onToggleConnection: (id: string) => void;
}

const IntegrationListItem: React.FC<IntegrationListItemProps> = ({ integration, onToggleConnection }) => {
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
        <Badge variant="outline" className="text-xs">{integration.category}</Badge>
        <Button 
          variant={integration.connected ? "destructive" : "default"}
          size="sm"
          onClick={() => onToggleConnection(integration.id)}
          className="min-w-[120px]"
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
      </div>
    </div>
  );
};

export default IntegrationListItem;
