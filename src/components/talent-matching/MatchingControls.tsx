
import React from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Briefcase, ChevronDown, Loader2, Search } from "lucide-react";

interface MatchingControlsProps {
  handleSourceSelect: (source: string) => void;
  parseJobDescription: () => void;
  isLoading: boolean;
}

const MatchingControls: React.FC<MatchingControlsProps> = ({
  handleSourceSelect,
  parseJobDescription,
  isLoading,
}) => {
  return (
    <div className="flex justify-between flex-col sm:flex-row space-y-3 sm:space-y-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Briefcase className="mr-2 h-4 w-4" />
            Match From
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleSourceSelect("all")}>
            All Sources
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSourceSelect("linkedin")}>
            LinkedIn
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSourceSelect("ceipal")}>
            Ceipal
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSourceSelect("jobdiva")}>
            JobDiva
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSourceSelect("stafferlink")}>
            Stafferlink
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button onClick={parseJobDescription} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Matching...
          </>
        ) : (
          <>
            <Search className="mr-2 h-4 w-4" />
            Find Matching Candidates
          </>
        )}
      </Button>
    </div>
  );
};

export default MatchingControls;
