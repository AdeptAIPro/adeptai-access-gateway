
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Filter } from "lucide-react";
import { LeadFilter } from "@/services/crm/types";

interface LeadFiltersProps {
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
}

const LeadFilters: React.FC<LeadFiltersProps> = ({
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
}) => {
  return (
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
          onValueChange={(value) => setFilter({...filter, status: value || undefined})}
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
          onValueChange={(value) => setFilter({...filter, source: value || undefined})}
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
  );
};

export default LeadFilters;
