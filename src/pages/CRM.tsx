
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LeadCaptureForm from "@/components/crm/LeadCaptureForm";
import LeadManagementCard from "@/components/crm/LeadManagementCard";
import HubspotIntegrationCard from "@/components/crm/HubspotIntegrationCard";
import LeadScoreDistributionChart from "@/components/crm/LeadScoreDistributionChart";
import AIDataEnrichmentCard from "@/components/crm/AIDataEnrichmentCard";
import { useCRM } from "@/hooks/use-crm";
import { useAIEnrichment } from "@/hooks/use-ai-enrichment";

const CRM = () => {
  const {
    loading,
    leads,
    searchQuery,
    filter,
    isFiltersOpen,
    fromDate,
    toDate,
    hubspotStatus,
    user,
    setSearchQuery,
    setFilter,
    setIsFiltersOpen,
    setFromDate,
    setToDate,
    fetchLeads,
    handleStatusChange,
    exportToCsv,
    applyDateFilter,
    clearFilters,
    handleConnectHubSpot,
  } = useCRM();
  
  const { handleEnrichLeads, handleEnrichTalents } = useAIEnrichment();
  
  if (!user) {
    return null;
  }
  
  return (
    <DashboardLayout title="Sales CRM">
      <div className="space-y-6">
        <LeadManagementCard
          leads={leads}
          loading={loading}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filter={filter}
          setFilter={setFilter}
          isFiltersOpen={isFiltersOpen}
          setIsFiltersOpen={setIsFiltersOpen}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          applyDateFilter={applyDateFilter}
          clearFilters={clearFilters}
          fetchLeads={fetchLeads}
          exportToCsv={exportToCsv}
          handleStatusChange={handleStatusChange}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <LeadScoreDistributionChart leads={leads} />
            <HubspotIntegrationCard
              hubspotStatus={hubspotStatus}
              handleConnectHubSpot={handleConnectHubSpot}
            />
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Lead</CardTitle>
              </CardHeader>
              <CardContent>
                <LeadCaptureForm source="manual" />
              </CardContent>
            </Card>
            
            <AIDataEnrichmentCard
              onEnrichLeads={handleEnrichLeads}
              onEnrichTalents={handleEnrichTalents}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CRM;
