
import React, { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Puzzle, Plus, AlertCircle, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { connectOnboardingTool, OnboardingTool } from "@/services/onboarding/OnboardingService";

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

interface OnboardingIntegrationsProps {
  clientId: string;
  availableTools: OnboardingTool[];
  connectedTools: OnboardingTool[];
  onToolConnected: () => void;
}

const OnboardingIntegrations: React.FC<OnboardingIntegrationsProps> = ({
  clientId,
  availableTools,
  connectedTools,
  onToolConnected
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
      const success = await connectOnboardingTool(clientId, values);
      
      if (success) {
        toast({
          title: "Integration connected",
          description: `Successfully connected to ${selectedTool.name}`,
        });
        setIsDialogOpen(false);
        onToolConnected();
      } else {
        toast({
          title: "Connection failed",
          description: "Failed to connect to the onboarding tool. Please check your credentials.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error connecting tool:", error);
      toast({
        title: "Connection error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Onboarding Integrations</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Connect Tool
            </Button>
          </DialogTrigger>
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
                        <Card 
                          key={tool.id} 
                          className={`cursor-pointer transition-all hover:shadow-md ${
                            selectedTool?.id === tool.id ? 'border-primary' : ''
                          }`}
                          onClick={() => handleToolSelection(tool)}
                        >
                          <CardHeader className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="rounded-md p-1 bg-primary/10 flex items-center justify-center">
                                <Puzzle className="h-4 w-4 text-primary" />
                              </div>
                              <CardTitle className="text-base">{tool.name}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent className="px-4 py-2 text-xs text-muted-foreground">
                            {tool.description}
                          </CardContent>
                          <CardFooter className="px-4 py-2 flex justify-between items-center">
                            <Badge variant="outline">{tool.category}</Badge>
                            {selectedTool?.id === tool.id && (
                              <Check className="h-4 w-4 text-primary" />
                            )}
                          </CardFooter>
                        </Card>
                      ))}

                      {availableTools.length === 0 && (
                        <div className="col-span-2 flex flex-col items-center justify-center py-8 text-center">
                          <AlertCircle className="h-8 w-8 text-muted-foreground mb-4" />
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
                    onClick={() => setIsDialogOpen(false)}
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
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {connectedTools.length > 0 ? (
          connectedTools.map(tool => (
            <Card key={tool.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-md p-1.5 bg-green-100 flex items-center justify-center">
                      <Puzzle className="h-4 w-4 text-green-600" />
                    </div>
                    <CardTitle className="text-base">{tool.name}</CardTitle>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-600">Connected</Badge>
                </div>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <Badge variant="secondary">{tool.category}</Badge>
                <Button variant="ghost" size="sm" className="text-xs">
                  Configure
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center p-8 border rounded-lg border-dashed">
            <Puzzle className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No tools connected</h3>
            <p className="text-muted-foreground text-center mb-4">
              Connect your existing onboarding tools to streamline your workflow
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Connect Tool
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingIntegrations;
