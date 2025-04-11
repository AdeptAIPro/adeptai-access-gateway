
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { 
  getLeads, 
  updateLeadStatus, 
  getHubSpotStatus, 
  testHubSpotConnection 
} from "@/services/crm/HubspotService";
import { scoreLeads } from "@/services/crm/LeadScoringService";
import { LeadFilter, Lead } from "@/services/crm/types";

export const useCRM = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<LeadFilter>({});
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [hubspotStatus, setHubspotStatus] = useState<{ connected: boolean; email: string }>({
    connected: false,
    email: 'crm@adeptaipro.com'
  });
  
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    
    const status = getHubSpotStatus();
    setHubspotStatus(status);
    
    fetchLeads();
  }, [filter, user, navigate]);
  
  const fetchLeads = async () => {
    setLoading(true);
    try {
      const data = await getLeads(filter);
      // Apply AI scoring to all leads
      const scoredLeads = scoreLeads(data);
      setLeads(scoredLeads);
    } catch (error) {
      console.error("Error fetching leads:", error);
      toast({
        title: "Error",
        description: "Failed to fetch leads data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleStatusChange = async (id: string, status: string) => {
    try {
      const success = await updateLeadStatus(id, status);
      if (success) {
        setLeads(leads.map(lead => 
          lead.id === id ? { ...lead, status: status as any } : lead
        ));
        toast({
          title: "Status Updated",
          description: `Lead status changed to ${status}`,
        });
      } else {
        toast({
          title: "Update Failed",
          description: "Could not update lead status",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating lead status:", error);
      toast({
        title: "Error",
        description: "Failed to update lead status",
        variant: "destructive",
      });
    }
  };
  
  const exportToCsv = () => {
    try {
      const headers = ["Name", "Email", "Company", "Phone", "Source", "Status", "Date"];
      const csvContent = [
        headers.join(","),
        ...leads.map(lead => [
          lead.name || "",
          lead.email,
          lead.company || "",
          lead.phone || "",
          lead.source,
          lead.status,
          lead.created_at ? new Date(lead.created_at).toLocaleDateString() : ""
        ].map(cell => `"${cell}"`).join(","))
      ].join("\n");
      
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `adeptai_leads_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Export Complete",
        description: "Leads exported to CSV successfully",
      });
    } catch (error) {
      console.error("Error exporting to CSV:", error);
      toast({
        title: "Export Failed",
        description: "Could not export leads to CSV",
        variant: "destructive",
      });
    }
  };
  
  const applyDateFilter = () => {
    setFilter(prev => ({
      ...prev,
      dateFrom: fromDate,
      dateTo: toDate
    }));
  };
  
  const clearFilters = () => {
    setFilter({});
    setFromDate(undefined);
    setToDate(undefined);
    setIsFiltersOpen(false);
  };
  
  const handleConnectHubSpot = async () => {
    try {
      const isConnected = await testHubSpotConnection();
      if (isConnected) {
        toast({
          title: "Connection Successful",
          description: "Your HubSpot integration is working correctly.",
        });
        setHubspotStatus({...hubspotStatus, connected: true});
      } else {
        toast({
          title: "Connection Failed",
          description: "Please check your HubSpot API key. See the documentation in the HubspotService.ts file.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Please set the VITE_HUBSPOT_API_KEY environment variable to connect to HubSpot.",
        variant: "destructive",
      });
    }
  };

  return {
    // State
    loading,
    leads,
    searchQuery,
    filter,
    isFiltersOpen,
    fromDate,
    toDate,
    hubspotStatus,
    user,
    
    // State setters
    setSearchQuery,
    setFilter,
    setIsFiltersOpen,
    setFromDate,
    setToDate,
    
    // Functions
    fetchLeads,
    handleStatusChange,
    exportToCsv,
    applyDateFilter,
    clearFilters,
    handleConnectHubSpot,
  };
};
