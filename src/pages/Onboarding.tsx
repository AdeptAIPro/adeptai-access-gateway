
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, Building2, Search, Puzzle } from "lucide-react";
import ClientSelector from "@/components/onboarding/ClientSelector";
import OnboardingWorkflowCard from "@/components/onboarding/OnboardingWorkflowCard";
import OnboardingWorkflowDetail from "@/components/onboarding/OnboardingWorkflowDetail";
import OnboardingWorkflowCreator from "@/components/onboarding/OnboardingWorkflowCreator";
import OnboardingIntegrations from "@/components/onboarding/OnboardingIntegrations";
import { 
  getClientOnboardingData, 
  OnboardingClient, 
  OnboardingWorkflow,
  OnboardingTool,
  getOnboardingTools,
  getClientConnectedTools
} from "@/services/onboarding/OnboardingService";
import { Input } from "@/components/ui/input";

const Onboarding = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [clients, setClients] = useState<OnboardingClient[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedWorkflow, setSelectedWorkflow] = useState<OnboardingWorkflow | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"workflows" | "integrations">("workflows");
  const [availableTools, setAvailableTools] = useState<OnboardingTool[]>([]);
  const [connectedTools, setConnectedTools] = useState<OnboardingTool[]>([]);
  
  // Get client data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getClientOnboardingData();
        setClients(data);
        
        // If clients exist, select the first one by default
        if (data.length > 0 && !selectedClientId) {
          setSelectedClientId(data[0].id);
        }
      } catch (error) {
        console.error("Error fetching client data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // When a client is selected, fetch their connected tools
  useEffect(() => {
    const fetchTools = async () => {
      if (selectedClientId && viewMode === "integrations") {
        try {
          const [allTools, clientTools] = await Promise.all([
            getOnboardingTools(),
            getClientConnectedTools(selectedClientId)
          ]);
          
          setAvailableTools(allTools.filter(tool => 
            !clientTools.some(ct => ct.id === tool.id)
          ));
          setConnectedTools(clientTools);
        } catch (error) {
          console.error("Error fetching tools:", error);
        }
      }
    };
    
    fetchTools();
  }, [selectedClientId, viewMode]);
  
  if (!user) {
    navigate("/login");
    return null;
  }

  // Get the selected client's workflows
  const selectedClient = clients.find(client => client.id === selectedClientId);
  
  // Filter workflows based on the active tab and search term
  const filteredWorkflows = selectedClient?.workflows.filter(workflow => {
    const matchesTab = activeTab === "all" || workflow.sector === activeTab;
    const matchesSearch = searchTerm === "" || 
      workflow.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workflow.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesSearch;
  }) || [];

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      const updatedData = await getClientOnboardingData();
      setClients(updatedData);
      
      if (viewMode === "integrations" && selectedClientId) {
        const [allTools, clientTools] = await Promise.all([
          getOnboardingTools(),
          getClientConnectedTools(selectedClientId)
        ]);
        
        setAvailableTools(allTools.filter(tool => 
          !clientTools.some(ct => ct.id === tool.id)
        ));
        setConnectedTools(clientTools);
      }
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToolConnected = () => {
    // Refresh the integrations data
    handleRefresh();
  };

  return (
    <DashboardLayout title="Onboarding">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Employee Onboarding</h2>
            <p className="text-muted-foreground">
              Manage onboarding workflows for your clients across different workforce sectors
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            {selectedClientId && !selectedWorkflow && viewMode === "workflows" && (
              <OnboardingWorkflowCreator 
                clientId={selectedClientId} 
                onWorkflowCreated={handleRefresh} 
              />
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-adept"></div>
          </div>
        ) : selectedWorkflow ? (
          // Show workflow details when a workflow is selected
          <OnboardingWorkflowDetail 
            workflow={selectedWorkflow} 
            clientId={selectedClientId!} 
            onBack={() => setSelectedWorkflow(null)} 
          />
        ) : (
          // Show client selection and workflow listing
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <ClientSelector 
                clients={clients}
                selectedClientId={selectedClientId}
                onClientSelect={setSelectedClientId}
              />
              
              {viewMode === "workflows" && (
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search workflows..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              )}
            </div>

            {selectedClient ? (
              <div className="space-y-4">
                <Tabs defaultValue="workflows" value={viewMode} onValueChange={(value) => setViewMode(value as "workflows" | "integrations")}>
                  <TabsList>
                    <TabsTrigger value="workflows">Workflows</TabsTrigger>
                    <TabsTrigger value="integrations">Integrations</TabsTrigger>
                  </TabsList>

                  <TabsContent value="workflows" className="space-y-6">
                    <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                      <TabsList>
                        <TabsTrigger value="all">All Workflows</TabsTrigger>
                        <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
                        <TabsTrigger value="it">IT</TabsTrigger>
                        <TabsTrigger value="general">General</TabsTrigger>
                      </TabsList>

                      <TabsContent value="all" className="space-y-6">
                        {filteredWorkflows.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredWorkflows.map(workflow => (
                              <OnboardingWorkflowCard 
                                key={workflow.id} 
                                workflow={workflow} 
                                onClick={() => setSelectedWorkflow(workflow)}
                              />
                            ))}
                          </div>
                        ) : (
                          <Card>
                            <CardContent className="py-8 flex flex-col items-center text-center">
                              <UserPlus className="h-12 w-12 text-muted-foreground mb-4" />
                              <h3 className="text-lg font-medium mb-2">No onboarding workflows found</h3>
                              <p className="text-muted-foreground max-w-md mb-4">
                                {searchTerm ? 
                                  "No workflows match your search criteria." :
                                  `This client doesn't have any ${activeTab !== 'all' ? activeTab + ' ' : ''}onboarding workflows yet.`
                                }
                              </p>
                              <OnboardingWorkflowCreator 
                                clientId={selectedClientId} 
                                onWorkflowCreated={handleRefresh} 
                              />
                            </CardContent>
                          </Card>
                        )}
                      </TabsContent>

                      <TabsContent value="healthcare" className="space-y-6">
                        {filteredWorkflows.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredWorkflows.map(workflow => (
                              <OnboardingWorkflowCard 
                                key={workflow.id} 
                                workflow={workflow} 
                                onClick={() => setSelectedWorkflow(workflow)}
                              />
                            ))}
                          </div>
                        ) : (
                          <Card>
                            <CardContent className="py-8 flex flex-col items-center text-center">
                              <UserPlus className="h-12 w-12 text-muted-foreground mb-4" />
                              <h3 className="text-lg font-medium mb-2">No healthcare onboarding workflows</h3>
                              <p className="text-muted-foreground max-w-md mb-4">
                                Create a healthcare-specific onboarding workflow to get started.
                              </p>
                              <OnboardingWorkflowCreator 
                                clientId={selectedClientId} 
                                onWorkflowCreated={handleRefresh} 
                              />
                            </CardContent>
                          </Card>
                        )}
                      </TabsContent>

                      <TabsContent value="it" className="space-y-6">
                        {filteredWorkflows.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredWorkflows.map(workflow => (
                              <OnboardingWorkflowCard 
                                key={workflow.id} 
                                workflow={workflow} 
                                onClick={() => setSelectedWorkflow(workflow)}
                              />
                            ))}
                          </div>
                        ) : (
                          <Card>
                            <CardContent className="py-8 flex flex-col items-center text-center">
                              <UserPlus className="h-12 w-12 text-muted-foreground mb-4" />
                              <h3 className="text-lg font-medium mb-2">No IT onboarding workflows</h3>
                              <p className="text-muted-foreground max-w-md mb-4">
                                Create an IT-specific onboarding workflow to get started.
                              </p>
                              <OnboardingWorkflowCreator 
                                clientId={selectedClientId} 
                                onWorkflowCreated={handleRefresh} 
                              />
                            </CardContent>
                          </Card>
                        )}
                      </TabsContent>

                      <TabsContent value="general" className="space-y-6">
                        {filteredWorkflows.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredWorkflows.map(workflow => (
                              <OnboardingWorkflowCard 
                                key={workflow.id} 
                                workflow={workflow} 
                                onClick={() => setSelectedWorkflow(workflow)}
                              />
                            ))}
                          </div>
                        ) : (
                          <Card>
                            <CardContent className="py-8 flex flex-col items-center text-center">
                              <UserPlus className="h-12 w-12 text-muted-foreground mb-4" />
                              <h3 className="text-lg font-medium mb-2">No general onboarding workflows</h3>
                              <p className="text-muted-foreground max-w-md mb-4">
                                Create a general onboarding workflow to get started.
                              </p>
                              <OnboardingWorkflowCreator 
                                clientId={selectedClientId} 
                                onWorkflowCreated={handleRefresh} 
                              />
                            </CardContent>
                          </Card>
                        )}
                      </TabsContent>
                    </Tabs>
                  </TabsContent>

                  <TabsContent value="integrations" className="space-y-6">
                    <OnboardingIntegrations
                      clientId={selectedClientId!}
                      availableTools={availableTools}
                      connectedTools={connectedTools}
                      onToolConnected={handleToolConnected}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 flex flex-col items-center text-center">
                  <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Clients Available</h3>
                  <p className="text-muted-foreground max-w-md">
                    Add clients to start creating onboarding workflows. Each client can have multiple workflows for different workforce sectors.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Onboarding;
