
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Download, 
  Calendar,
  ChevronDown,
  BarChart3,
  LineChart as LineChartIcon
} from "lucide-react";

interface AnalyticsControlsProps {
  timeframe: string;
  onTimeframeChange: (value: string) => void;
  onChartTypeChange: (type: string) => void;
  onExport: () => void;
}

const AnalyticsControls: React.FC<AnalyticsControlsProps> = ({
  timeframe,
  onTimeframeChange,
  onChartTypeChange,
  onExport
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
      <h2 className="text-2xl font-bold">Talent Matching Analytics</h2>
      
      <div className="flex flex-wrap gap-3">
        <Select value={timeframe} onValueChange={onTimeframeChange}>
          <SelectTrigger className="w-[150px]">
            <Calendar className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last Week</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="quarter">Last Quarter</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
          </SelectContent>
        </Select>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Chart Type
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onChartTypeChange("bar")}>
              <BarChart3 className="mr-2 h-4 w-4" />
              Bar Chart
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onChartTypeChange("line")}>
              <LineChartIcon className="mr-2 h-4 w-4" />
              Line Chart
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" onClick={onExport}>
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>
    </div>
  );
};

export default AnalyticsControls;
