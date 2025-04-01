
import React, { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

interface PayrollSystem {
  id: string;
  name: string;
  connected: boolean;
}

const PayrollIntegrations = () => {
  const { toast } = useToast();
  const [payrollSystems, setPayrollSystems] = useState<PayrollSystem[]>([
    { id: "adp", name: "ADP", connected: false },
    { id: "paycom", name: "Paycom", connected: false },
    { id: "paychex", name: "Paychex", connected: false },
    { id: "zoho", name: "Zoho Payroll", connected: false },
    { id: "deel", name: "Deel", connected: false },
    { id: "gusto", name: "Gusto", connected: false },
    { id: "quickbooks", name: "QuickBooks Payroll", connected: false },
    { id: "wave", name: "Wave Payroll", connected: false },
  ]);
  
  const [apiKey, setApiKey] = useState("");
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);

  const handleConnect = (id: string) => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter a valid API key to connect.",
        variant: "destructive",
      });
      return;
    }

    setPayrollSystems(systems => 
      systems.map(system => 
        system.id === id ? { ...system, connected: true } : system
      )
    );
    setApiKey("");
    setSelectedSystem(null);
    
    toast({
      title: "Integration Successful",
      description: `Successfully connected to ${payrollSystems.find(s => s.id === id)?.name}.`,
    });
  };

  const handleDisconnect = (id: string) => {
    setPayrollSystems(systems => 
      systems.map(system => 
        system.id === id ? { ...system, connected: false } : system
      )
    );
    
    toast({
      title: "Integration Removed",
      description: `Disconnected from ${payrollSystems.find(s => s.id === id)?.name}.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground mb-4">
        Connect your payroll system via API to automate payroll processing
      </div>
      
      <div className="space-y-2">
        {payrollSystems.map((system) => (
          <div 
            key={system.id}
            className="flex items-center justify-between p-3 rounded-md border"
          >
            <div className="font-medium">{system.name}</div>
            <div>
              {system.connected ? (
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-sm text-green-600">
                    <Check size={16} className="mr-1" /> Connected
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDisconnect(system.id)}
                  >
                    Disconnect
                  </Button>
                </div>
              ) : (
                <div>
                  {selectedSystem === system.id ? (
                    <div className="flex items-center gap-2">
                      <Input
                        type="password"
                        placeholder="Enter API Key"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="w-40"
                      />
                      <Button 
                        size="sm" 
                        onClick={() => handleConnect(system.id)}
                      >
                        Connect
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          setSelectedSystem(null);
                          setApiKey("");
                        }}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedSystem(system.id)}
                    >
                      Connect
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PayrollIntegrations;
