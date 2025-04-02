
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";
import LeadFilters from "./LeadFilters";
import LeadTable from "./LeadTable";
import { Lead, LeadFilter } from "@/services/crm/types";
import { useIsMobile } from "@/hooks/use-mobile";

interface LeadManagementCardProps {
  leads: Lead[];
  loading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filter: LeadFilter;
  setFilter: (filter: LeadFilter) => void;
  isFiltersOpen: boolean;
  setIsFiltersOpen: (isOpen: boolean) => void;
  fromDate: Date | undefined;
  setFromDate: (date: Date | undefined) => void;
  toDate: Date | undefined;
  setToDate: (date: Date | undefined) => void;
  applyDateFilter: () => void;
  clearFilters: () => void;
  fetchLeads: () => Promise<void>;
  exportToCsv: () => void;
  handleStatusChange: (id: string, status: string) => Promise<void>;
}

const LeadManagementCard: React.FC<LeadManagementCardProps> = ({
  leads,
  loading,
  searchQuery,
  setSearchQuery,
  filter,
  setFilter,
  isFiltersOpen,
  setIsFiltersOpen,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  applyDateFilter,
  clearFilters,
  fetchLeads,
  exportToCsv,
  handleStatusChange,
}) => {
  const isMobile = useIsMobile();
  
  // Filter leads based on search query
  const filteredLeads = leads.filter(lead => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      (lead.name?.toLowerCase().includes(query) || false) ||
      lead.email.toLowerCase().includes(query) ||
      (lead.company?.toLowerCase().includes(query) || false)
    );
  });

  return (
    <Card>
      <CardHeader className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0 pb-2">
        <div>
          <CardTitle>Lead Management</CardTitle>
          <CardDescription>Manage and track your sales leads</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="outline" onClick={fetchLeads}>
            <RefreshCw className="mr-2 h-4 w-4" />
            {isMobile ? '' : 'Refresh'}
          </Button>
          <Button size="sm" variant="outline" onClick={exportToCsv}>
            <Download className="mr-2 h-4 w-4" />
            {isMobile ? '' : 'Export'}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <LeadFilters
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
        />
        
        <LeadTable
          leads={filteredLeads}
          loading={loading}
          handleStatusChange={handleStatusChange}
        />
      </CardContent>
    </Card>
  );
};

export default LeadManagementCard;
