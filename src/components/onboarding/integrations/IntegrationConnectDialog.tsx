
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Puzzle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { OnboardingTool } from "@/services/onboarding/OnboardingService";
import IntegrationToolCard from "./IntegrationToolCard";

// Define the schema for API connection
const apiConnectionSchema = z.object({
  toolId: z.string(),
  apiKey: z.string().min(1, "API key is required"),
  apiUrl: z.string().url("Must be a valid URL").optional(),
  webhookUrl: z.string().url("Must be a valid URL").optional(),
  username: z.string().optional(),
  password: z.string().optional(),
});

type ApiConnectionFormValues = z.infer<typeof apiConnectionSchema>;

interface IntegrationConnectDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  availableTools: OnboardingTool[];
  clientId: string;
  onToolConnected: () => void;
}

const IntegrationConnectDialog: React.FC<IntegrationConnectDialogProps> = ({
  isOpen,
  onOpenChange,
  availableTools,
  clientId,
  onToolConnected
}) => {
  const [selectedTool, setSelectedTool] = useState<OnboardingTool | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const form = useForm<ApiConnectionFormValues>({
    resolver: zodResolver(apiConnectionSchema),
    defaultValues: {
      toolId: "",
      apiKey: "",
      apiUrl: "",
      webhookUrl: "",
      username: "",
      password: ""
    }
  });

  const handleToolSelection = (tool: OnboardingTool) => {
    setSelectedTool(tool);
    form.setValue("toolId", tool.id);
  };

  const onSubmit = async (values: ApiConnectionFormValues) => {
    if (!selectedTool) return;
    
    setIsConnecting(true);
    try {
      // This would be replaced with your actual connection logic
      console.log("Connecting tool with values:", values);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onOpenChange(false);
      onToolConnected();
    } catch (error) {
      console.error("Error connecting tool:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Connect an Onboarding Tool</DialogTitle>
          <DialogDescription>
            Connect your existing onboarding tools to streamline your workflow with AdeptAI Pro.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="available">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="available">Available Tools</TabsTrigger>
                <TabsTrigger value="manual">Manual Configuration</TabsTrigger>
              </TabsList>
              
              <TabsContent value="available" className="pt-4">
                <div className="grid grid-cols-2 gap-4 max-h-[300px] overflow-y-auto p-1">
                  {availableTools.map(tool => (
                    <IntegrationToolCard 
                      key={tool.id}
                      tool={tool}
                      isSelected={selectedTool?.id === tool.id}
                      onClick={() => handleToolSelection(tool)}
                    />
                  ))}

                  {availableTools.length === 0 && (
                    <div className="col-span-2 flex flex-col items-center justify-center py-8 text-center">
                      <Puzzle className="h-8 w-8 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No additional tools available for integration</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="manual" className="pt-4">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="apiKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>API Key</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your API key" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="apiUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>API URL</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://api.example.com" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="webhookUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Webhook URL (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://webhooks.example.com/callback" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="API username" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="API password" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={(!selectedTool && !form.getValues("apiKey")) || isConnecting}
              >
                {isConnecting ? "Connecting..." : "Connect"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default IntegrationConnectDialog;
