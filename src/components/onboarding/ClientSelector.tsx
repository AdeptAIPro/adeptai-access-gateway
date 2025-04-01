
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

  return (
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
  );
};

export default ClientSelector;
