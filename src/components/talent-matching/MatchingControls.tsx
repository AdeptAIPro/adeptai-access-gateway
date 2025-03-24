
import React from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Briefcase, ChevronDown, Loader2, Search, Settings } from "lucide-react";

interface MatchingControlsProps {
  handleSourceSelect: (source: string) => void;
  parseJobDescription: () => void;
  isLoading: boolean;
  toggleAdvancedOptions: () => void;
  showAdvancedOptions: boolean;
}

const MatchingControls: React.FC<MatchingControlsProps> = ({
  handleSourceSelect,
  parseJobDescription,
  isLoading,
  toggleAdvancedOptions,
  showAdvancedOptions,
}) => {
  return (
    <div className="flex justify-between flex-col sm:flex-row space-y-3 sm:space-y-0 w-full">
      <div className="flex space-x-2">
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
        
        <Button 
          variant={showAdvancedOptions ? "default" : "outline"} 
          onClick={toggleAdvancedOptions}
        >
          <Settings className="mr-2 h-4 w-4" />
          {showAdvancedOptions ? "Hide" : "Show"} AI Options
        </Button>
      </div>
      
      <Button onClick={parseJobDescription} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Matching with AI...
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
