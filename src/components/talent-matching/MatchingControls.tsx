
import React from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Briefcase, ChevronDown, Loader2, Search, Settings, Sparkles } from "lucide-react";

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
    <div className="bg-gradient-to-r from-adept-50 to-white dark:from-gray-800 dark:to-gray-900 p-4 rounded-lg shadow-md mb-6 border border-adept/20">
      <div className="flex justify-between flex-col sm:flex-row gap-4">
        <div className="flex flex-wrap gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-adept/30 hover:border-adept">
                <Briefcase className="mr-2 h-4 w-4 text-adept" />
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
            variant={showAdvancedOptions ? "secondary" : "outline"} 
            onClick={toggleAdvancedOptions}
            className={showAdvancedOptions ? "border-adept/30 bg-adept/10" : "border-adept/30"}
          >
            <Settings className="mr-2 h-4 w-4 text-adept" />
            {showAdvancedOptions ? "Hide" : "Show"} AI Options
          </Button>
        </div>
        
        <Button 
          onClick={parseJobDescription} 
          disabled={isLoading}
          className="bg-adept hover:bg-adept/90 text-white px-8"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Matching with AI...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Find Matching Candidates
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default MatchingControls;
