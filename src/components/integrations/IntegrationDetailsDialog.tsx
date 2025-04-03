
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { IntegrationItem } from "@/types/integration";
import { Badge } from "@/components/ui/badge";
import { Link as LinkIcon, X as XIcon, Lock, ExternalLink, Settings } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { isIntegrationAvailableForPlan, getRequiredPlanForIntegration } from "@/services/integrations/IntegrationValidationService";

interface IntegrationDetailsDialogProps {
  integration: IntegrationItem | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onToggleConnection: (id: string) => void;
  isConnecting: boolean;
}

const IntegrationDetailsDialog: React.FC<IntegrationDetailsDialogProps> = ({
  integration,
  isOpen,
  onOpenChange,
  onToggleConnection,
  isConnecting,
}) => {
  const { user } = useAuth();
  const userPlan = user?.plan as "free_trial" | "pro" | "business" | "enterprise" | null;
  
  if (!integration) return null;
  
  const isAvailable = isIntegrationAvailableForPlan(integration, userPlan);
  const { planName } = getRequiredPlanForIntegration(integration);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-md h-10 w-10 flex items-center justify-center">
              <integration.icon className="h-5 w-5" />
            </div>
            {integration.name}
            {integration.connected && (
              <Badge variant="success" className="ml-2">
                Connected
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription className="text-sm">
            {integration.description}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="settings" disabled={!integration.connected}>
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Category</h4>
                <p className="text-sm">{integration.category}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Required Plan</h4>
                <p className="text-sm">{planName}+</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Status</h4>
                <p className="text-sm">
                  {integration.connected ? (
                    <span className="text-green-600 font-medium">Connected</span>
                  ) : isAvailable ? (
                    <span className="text-amber-600 font-medium">Available</span>
                  ) : (
                    <span className="text-gray-500">Requires Upgrade</span>
                  )}
                </p>
              </div>
            </div>
            
            <div className="py-2">
              <h4 className="text-sm font-medium text-gray-500 mb-1">About this integration</h4>
              <p className="text-sm">
                This integration allows you to connect your {integration.name} account with our platform, 
                enabling seamless data exchange and workflow automation.
              </p>
            </div>
            
            <div className="pt-2">
              <a 
                href="#" 
                className="text-sm text-blue-600 hover:text-blue-800 inline-flex items-center"
                onClick={(e) => e.preventDefault()}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                View documentation
              </a>
            </div>
          </TabsContent>
          
          <TabsContent value="features" className="space-y-3 py-4">
            <h4 className="text-sm font-medium">Key Features</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li className="text-sm">Automatic data synchronization</li>
              <li className="text-sm">Real-time notifications</li>
              <li className="text-sm">Advanced reporting capabilities</li>
              <li className="text-sm">Customizable workflow automation</li>
              <li className="text-sm">Secure encrypted data transfer</li>
            </ul>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-3 py-4">
            {integration.connected ? (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium">Integration Settings</h4>
                  <p className="text-sm text-gray-500">
                    Configure your {integration.name} integration settings here.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">API Key</label>
                    <div className="flex mt-1">
                      <input 
                        type="password" 
                        value="••••••••••••••••" 
                        readOnly 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2" 
                      />
                      <Button variant="outline" size="sm" className="ml-2">
                        Show
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Sync Frequency</label>
                    <select className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 mt-1">
                      <option>Every 15 minutes</option>
                      <option>Hourly</option>
                      <option>Daily</option>
                    </select>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Settings className="h-4 w-4" />
                    Advanced Settings
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <p className="text-sm text-gray-500">
                  Connect this integration to access settings.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="sm:justify-between">
          <div>
            {integration.connected && (
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700"
                onClick={() => onToggleConnection(integration.id)}
                disabled={isConnecting}
              >
                Reset Connection
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>

            {integration.connected ? (
              <Button 
                variant="destructive" 
                onClick={() => onToggleConnection(integration.id)}
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
                onClick={() => onToggleConnection(integration.id)}
                disabled={isConnecting}
              >
                {isConnecting ? (
                  <><span className="animate-spin mr-2">◌</span> Processing</>
                ) : (
                  <><LinkIcon className="mr-2 h-4 w-4" /> Connect</>
                )}
              </Button>
            ) : (
              <Button 
                variant="outline" 
                className="opacity-80"
                onClick={() => onToggleConnection(integration.id)}
                disabled={isConnecting}
              >
                <Lock className="mr-2 h-4 w-4" /> Upgrade to Connect
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default IntegrationDetailsDialog;
