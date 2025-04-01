
import React from "react";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { OnboardingClient } from "@/services/onboarding/OnboardingService";
import { Badge } from "@/components/ui/badge";
import { Puzzle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ClientSelectorProps {
  clients: OnboardingClient[];
  selectedClientId: string | null;
  onClientSelect: (clientId: string) => void;
}

const ClientSelector: React.FC<ClientSelectorProps> = ({
  clients,
  selectedClientId,
  onClientSelect
}) => {
  if (clients.length === 0) {
    return (
      <div className="text-gray-500 italic text-sm">
        No clients available. Add clients to begin onboarding.
      </div>
    );
  }

  // Find the selected client to display connected integrations
  const selectedClient = clients.find(client => client.id === selectedClientId);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Client:</span>
        <Select
          value={selectedClientId || undefined}
          onValueChange={onClientSelect}
        >
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Select a client" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {clients.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  <div className="flex items-center justify-between w-full">
                    <span>{client.name}</span>
                    <Badge variant={
                      client.subscription === 'enterprise' 
                        ? 'default' 
                        : client.subscription === 'professional' 
                          ? 'secondary' 
                          : 'outline'
                    }>
                      {client.subscription}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      
      {selectedClient?.connectedOnboardingTools && selectedClient.connectedOnboardingTools.length > 0 && (
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 text-sm text-muted-foreground bg-muted px-2 py-1 rounded-md">
                  <Puzzle className="h-3.5 w-3.5" />
                  <span>{selectedClient.connectedOnboardingTools.length} integration{selectedClient.connectedOnboardingTools.length > 1 ? 's' : ''}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="font-semibold mb-1">Connected tools:</p>
                <ul className="text-xs">
                  {selectedClient.connectedOnboardingTools.map((tool, idx) => (
                    <li key={idx}>{tool.name}</li>
                  ))}
                </ul>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
};

export default ClientSelector;
