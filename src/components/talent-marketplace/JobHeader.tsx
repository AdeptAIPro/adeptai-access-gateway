
import React from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface JobHeaderProps {
  totalJobs: number;
  sortBy: string;
  setSortBy: (value: string) => void;
  toggleFilters: () => void;
}

const JobHeader: React.FC<JobHeaderProps> = ({ 
  totalJobs, 
  sortBy, 
  setSortBy, 
  toggleFilters 
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h2 className="text-2xl font-bold">Available Jobs</h2>
        <div className="text-sm text-gray-500 mt-1">
          {totalJobs} jobs found
        </div>
      </div>

      <div className="flex flex-wrap gap-2 w-full md:w-auto">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleFilters}
          className="flex items-center"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>

        <Select defaultValue={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Sort by: Relevance</SelectItem>
            <SelectItem value="newest">Sort by: Newest</SelectItem>
            <SelectItem value="salary-high">Sort by: Salary (High to Low)</SelectItem>
            <SelectItem value="salary-low">Sort by: Salary (Low to High)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default JobHeader;
