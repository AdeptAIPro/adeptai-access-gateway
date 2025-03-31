
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Download, Filter, Loader2, Mail, Phone, RefreshCw } from "lucide-react";
import { getLeads, updateLeadStatus, Lead, LeadFilter } from "@/services/crm/HubspotService";

const CRM = () => {
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
  
  if (!user) {
    navigate("/login");
    return null;
  }
  
  useEffect(() => {
    fetchLeads();
  }, [filter]);
  
  const fetchLeads = async () => {
    setLoading(true);
    try {
      const data = await getLeads(filter);
      setLeads(data);
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
          lead.id === id ? { ...lead, status } : lead
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
  
  // Filter leads by search query
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
    <DashboardLayout title="Sales CRM">
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Lead Management</CardTitle>
              <CardDescription>Manage and track your sales leads</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline" onClick={fetchLeads}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <Button size="sm" variant="outline" onClick={exportToCsv}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
              <div className="relative w-full md:w-1/2">
                <Input
                  placeholder="Search leads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              
              <div className="flex items-center space-x-2">
                <Select 
                  value={filter.status || ''} 
                  onValueChange={(value) => setFilter(prev => ({ ...prev, status: value || undefined }))}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status: All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="proposal">Proposal</SelectItem>
                    <SelectItem value="won">Won</SelectItem>
                    <SelectItem value="lost">Lost</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select 
                  value={filter.source || ''} 
                  onValueChange={(value) => setFilter(prev => ({ ...prev, source: value || undefined }))}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Source: All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Sources</SelectItem>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="widget">Widget</SelectItem>
                    <SelectItem value="landing_page">Landing Page</SelectItem>
                    <SelectItem value="manual">Manual Entry</SelectItem>
                  </SelectContent>
                </Select>
                
                <Popover open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Date Range
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-4" align="end">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Date range</h4>
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col">
                            <span className="text-sm">From</span>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="justify-start text-left font-normal"
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {fromDate ? format(fromDate, "PPP") : "Pick a date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={fromDate}
                                  onSelect={setFromDate}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          
                          <div className="flex flex-col">
                            <span className="text-sm">To</span>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="justify-start text-left font-normal"
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {toDate ? format(toDate, "PPP") : "Pick a date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={toDate}
                                  onSelect={setToDate}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm" onClick={clearFilters}>
                          Clear
                        </Button>
                        <Button size="sm" onClick={() => {
                          applyDateFilter();
                          setIsFiltersOpen(false);
                        }}>
                          Apply
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact Info</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        <div className="flex justify-center items-center">
                          <Loader2 className="h-6 w-6 animate-spin text-primary" />
                          <span className="ml-2">Loading leads...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : filteredLeads.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No leads found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLeads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">
                          {lead.name || "Unknown"}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col space-y-1">
                            <div className="flex items-center">
                              <Mail className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              <span className="text-sm">{lead.email}</span>
                            </div>
                            {lead.phone && (
                              <div className="flex items-center">
                                <Phone className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                <span className="text-sm">{lead.phone}</span>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{lead.company || "—"}</TableCell>
                        <TableCell>
                          <span className="capitalize">{lead.source}</span>
                        </TableCell>
                        <TableCell>
                          {lead.created_at 
                            ? new Date(lead.created_at).toLocaleDateString() 
                            : "—"
                          }
                        </TableCell>
                        <TableCell>
                          <Select 
                            value={lead.status} 
                            onValueChange={(value) => handleStatusChange(lead.id!, value)}
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="contacted">Contacted</SelectItem>
                              <SelectItem value="qualified">Qualified</SelectItem>
                              <SelectItem value="proposal">Proposal</SelectItem>
                              <SelectItem value="won">Won</SelectItem>
                              <SelectItem value="lost">Lost</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Mail className="h-4 w-4 mr-1" />
                            Contact
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>HubSpot Integration</CardTitle>
              <CardDescription>Connect with HubSpot CRM</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Connect your AdeptAI lead database with HubSpot CRM to automatically sync contacts, deals and communications.
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="bg-red-100 rounded-full p-2">
                    <svg className="w-6 h-6" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                      <path fill="#FF7A59" d="M512 236.2c0-6.8-.2-13.5-.8-20.2-6-69.5-42.2-128.7-94.3-166C325.9-13 148 8.8 56.7 127.3c-8.5 11-16 22.7-22.3 35-27.5 53.7-25.5 119.5 5.9 171 4.2 7 9 13.5 14 19.8 30 37.5 72.5 60.3 118.2 64.7 26.8 2.5 53.8-1 78.5-10.7 52.7-20.5 97.2-59.2 132.5-104.3 12.5-15.8 24-32.5 35.2-49.3 3-4.5 3.5-8.5 1.5-13.2-2-4.7-6-7.3-11.2-7.5-7.5-.3-15-.2-22.5-.2h-309c-11.2 0-15.3 4.8-12 15.5 1.8 6 7.8 10.2 14 10.2h251.5c6.8 0 13.7.2 20.5-.2 5-.3 7.2 1.3 5 7.2-2.5 6.5-5.3 12.7-8.5 18.8-17 33.8-40.7 62.2-71 84.2-50 36.3-122.8 39.7-176.5 8-51.5-30.5-80.5-88.8-72.8-147.8C25.5 68 94.7 10.8 166 3.2c80.3-8.5 154.8 39.5 181.8 116.8 3 8.7 7.5 10 15.5 6 6.8-3.5 13.5-7.3 20.2-11.2 4.8-2.8 7-6.8 5.2-12-1.7-5.2-3.8-10.3-6-15.3-34.5-73.2-98-112.8-177-114.3-86.3-1.7-157.8 43.2-188.5 124.8-31.7 84.7-.2 180.3 74.5 232 50.3 34.7 106.8 42.8 166 25.5 66.5-19.5 113.8-65.5 144.5-127.2 21.7-43.8 33.7-89.8 33.7-139.2l.2-.3z" />
                    </svg>
                  </div>
                  <span className="font-semibold">HubSpot CRM</span>
                </div>
                <Button className="py-2 px-4">Connect</Button>
              </div>
              <Separator className="my-4" />
              <p className="text-xs text-muted-foreground">
                HubSpot offers a free CRM with robust features including contact management, deal tracking, and email marketing tools.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Add New Lead</CardTitle>
              <CardDescription>Manually add a new lead to the system</CardDescription>
            </CardHeader>
            <CardContent>
              <LeadCaptureForm source="manual" />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CRM;
