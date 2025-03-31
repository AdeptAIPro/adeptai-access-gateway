
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { LeadFilter } from "@/services/crm/types";
import { Slider } from "@/components/ui/slider";

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
  const [minScore, setMinScore] = React.useState<number>(filter.minScore || 0);

  const handleApplyScoreFilter = () => {
    setFilter({ ...filter, minScore });
  };

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search leads by name, email or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select
          value={filter.status || "all"}
          onValueChange={(status) =>
            setFilter({ ...filter, status: status === "all" ? undefined : status })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="qualified">Qualified</SelectItem>
            <SelectItem value="proposal">Proposal</SelectItem>
            <SelectItem value="won">Won</SelectItem>
            <SelectItem value="lost">Lost</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        >
          Advanced Filters
        </Button>
      </div>

      <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
        <CollapsibleContent>
          <div className="bg-muted/50 p-4 rounded-md space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Source</label>
                <Select
                  value={filter.source || "all"}
                  onValueChange={(source) =>
                    setFilter({ ...filter, source: source === "all" ? undefined : source })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Sources" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="manual">Manual Entry</SelectItem>
                    <SelectItem value="widget">Chat Widget</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">From Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      {fromDate ? format(fromDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={fromDate}
                      onSelect={setFromDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">To Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      {toDate ? format(toDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
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

            <div>
              <label className="text-sm font-medium mb-1 block">
                Minimum Lead Score: {minScore}
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs">0</span>
                <Slider 
                  value={[minScore]} 
                  onValueChange={(value) => setMinScore(value[0])}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-xs">100</span>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
              <Button onClick={() => {
                applyDateFilter();
                handleApplyScoreFilter();
              }}>
                Apply Filters
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default LeadFilters;
