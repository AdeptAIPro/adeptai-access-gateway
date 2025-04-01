
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

const IntegrationCard: React.FC<IntegrationCardProps> = ({ integration, onToggleConnection }) => {
  return (
    <Card key={integration.id} className="hover:shadow-md transition-all overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="bg-primary/10 p-2 rounded-md h-12 w-12 flex items-center justify-center">
          <integration.icon className="h-8 w-8" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-lg flex items-center gap-2">
            {integration.name}
            {integration.connected && 
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Connected
              </Badge>
            }
          </CardTitle>
          <CardDescription className="text-xs">{integration.category}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{integration.description}</p>
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

export default IntegrationCard;
