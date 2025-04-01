
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPlus, Building2, Search } from "lucide-react";
import ClientSelector from "@/components/onboarding/ClientSelector";
import OnboardingWorkflowCard from "@/components/onboarding/OnboardingWorkflowCard";
import OnboardingWorkflowDetail from "@/components/onboarding/OnboardingWorkflowDetail";
import OnboardingWorkflowCreator from "@/components/onboarding/OnboardingWorkflowCreator";
import OnboardingIntegrations from "@/components/onboarding/OnboardingIntegrations";
import OnboardingEmptyState from "@/components/onboarding/OnboardingEmptyState";
import OnboardingHeader from "@/components/onboarding/OnboardingHeader";
import { Input } from "@/components/ui/input";
import { 
  getClientOnboardingData, 
  OnboardingClient, 
  OnboardingWorkflow,
  OnboardingTool,
  getOnboardingTools,
  getClientConnectedTools
} from "@/services/onboarding/OnboardingService";

const OnboardingDashboard = () => {
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

  return (
    <DashboardLayout title="Onboarding">
      <div className="space-y-6">
        <OnboardingHeader 
          selectedClientId={selectedClientId}
          selectedWorkflow={selectedWorkflow}
          viewMode={viewMode}
          onWorkflowCreated={handleRefresh}
        />

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
              <OnboardingContent
                selectedClient={selectedClient}
                viewMode={viewMode}
                setViewMode={setViewMode}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                filteredWorkflows={filteredWorkflows}
                onSelectWorkflow={setSelectedWorkflow}
                selectedClientId={selectedClientId}
                onWorkflowCreated={handleRefresh}
                availableTools={availableTools}
                connectedTools={connectedTools}
                onToolConnected={handleRefresh}
              />
            ) : (
              <OnboardingEmptyState type="no-clients" />
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

interface OnboardingContentProps {
  selectedClient: OnboardingClient;
  viewMode: "workflows" | "integrations";
  setViewMode: (mode: "workflows" | "integrations") => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  filteredWorkflows: OnboardingWorkflow[];
  onSelectWorkflow: (workflow: OnboardingWorkflow) => void;
  selectedClientId: string;
  onWorkflowCreated: () => void;
  availableTools: OnboardingTool[];
  connectedTools: OnboardingTool[];
  onToolConnected: () => void;
}

const OnboardingContent: React.FC<OnboardingContentProps> = ({
  selectedClient,
  viewMode,
  setViewMode,
  activeTab,
  setActiveTab,
  filteredWorkflows,
  onSelectWorkflow,
  selectedClientId,
  onWorkflowCreated,
  availableTools,
  connectedTools,
  onToolConnected
}) => {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="workflows" value={viewMode} onValueChange={(value) => setViewMode(value as "workflows" | "integrations")}>
        <TabsList>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="workflows" className="space-y-6">
          <OnboardingWorkflows
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            filteredWorkflows={filteredWorkflows}
            onSelectWorkflow={onSelectWorkflow}
            selectedClientId={selectedClientId}
            onWorkflowCreated={onWorkflowCreated}
          />
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <OnboardingIntegrations
            clientId={selectedClientId}
            availableTools={availableTools}
            connectedTools={connectedTools}
            onToolConnected={onToolConnected}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface OnboardingWorkflowsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  filteredWorkflows: OnboardingWorkflow[];
  onSelectWorkflow: (workflow: OnboardingWorkflow) => void;
  selectedClientId: string;
  onWorkflowCreated: () => void;
}

const OnboardingWorkflows: React.FC<OnboardingWorkflowsProps> = ({
  activeTab,
  setActiveTab,
  filteredWorkflows,
  onSelectWorkflow,
  selectedClientId,
  onWorkflowCreated
}) => {
  return (
    <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="all">All Workflows</TabsTrigger>
        <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
        <TabsTrigger value="it">IT</TabsTrigger>
        <TabsTrigger value="general">General</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="space-y-6">
        <WorkflowList
          workflows={filteredWorkflows}
          onSelectWorkflow={onSelectWorkflow}
          selectedClientId={selectedClientId}
          onWorkflowCreated={onWorkflowCreated}
          sectorFilter={null}
        />
      </TabsContent>

      <TabsContent value="healthcare" className="space-y-6">
        <WorkflowList
          workflows={filteredWorkflows}
          onSelectWorkflow={onSelectWorkflow}
          selectedClientId={selectedClientId}
          onWorkflowCreated={onWorkflowCreated}
          sectorFilter="healthcare"
        />
      </TabsContent>

      <TabsContent value="it" className="space-y-6">
        <WorkflowList
          workflows={filteredWorkflows}
          onSelectWorkflow={onSelectWorkflow}
          selectedClientId={selectedClientId}
          onWorkflowCreated={onWorkflowCreated}
          sectorFilter="it"
        />
      </TabsContent>

      <TabsContent value="general" className="space-y-6">
        <WorkflowList
          workflows={filteredWorkflows}
          onSelectWorkflow={onSelectWorkflow}
          selectedClientId={selectedClientId}
          onWorkflowCreated={onWorkflowCreated}
          sectorFilter="general"
        />
      </TabsContent>
    </Tabs>
  );
};

interface WorkflowListProps {
  workflows: OnboardingWorkflow[];
  onSelectWorkflow: (workflow: OnboardingWorkflow) => void;
  selectedClientId: string;
  onWorkflowCreated: () => void;
  sectorFilter: "healthcare" | "it" | "general" | null;
}

const WorkflowList: React.FC<WorkflowListProps> = ({
  workflows,
  onSelectWorkflow,
  selectedClientId,
  onWorkflowCreated,
  sectorFilter
}) => {
  const displayName = sectorFilter ? `${sectorFilter} ` : "";
  
  return workflows.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {workflows.map(workflow => (
        <OnboardingWorkflowCard 
          key={workflow.id} 
          workflow={workflow} 
          onClick={() => onSelectWorkflow(workflow)}
        />
      ))}
    </div>
  ) : (
    <OnboardingEmptyState 
      type="no-workflows"
      sector={sectorFilter}
      clientId={selectedClientId}
      onWorkflowCreated={onWorkflowCreated}
    />
  );
};

export default OnboardingDashboard;
