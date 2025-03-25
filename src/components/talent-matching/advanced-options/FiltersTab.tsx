
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { MatchingOptions } from "../types";
import { Filter } from "lucide-react";

interface FiltersTabProps {
  matchingOptions: MatchingOptions;
  handleToggleChange: (option: keyof MatchingOptions) => void;
  setMatchingOptions: (options: MatchingOptions) => void;
}

const FiltersTab: React.FC<FiltersTabProps> = ({
  matchingOptions,
  handleToggleChange,
  setMatchingOptions,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="skill-based">Skill-Based Filtering</Label>
          <p className="text-sm text-muted-foreground">
            Match candidates based on explicit skills in their profile
          </p>
        </div>
        <Switch
          id="skill-based"
          checked={matchingOptions.useSkillBasedFiltering}
          onCheckedChange={() => handleToggleChange("useSkillBasedFiltering")}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="compliance">Compliance Verification</Label>
          <p className="text-sm text-muted-foreground">
            Ensure candidates meet regulatory and certification requirements
          </p>
        </div>
        <Switch
          id="compliance"
          checked={matchingOptions.useComplianceVerification}
          onCheckedChange={() => handleToggleChange("useComplianceVerification")}
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="min-score">Minimum Match Score: {matchingOptions.minMatchScore}%</Label>
        </div>
        <Slider
          id="min-score"
          min={50}
          max={95}
          step={5}
          value={[matchingOptions.minMatchScore]}
          onValueChange={(value) => 
            setMatchingOptions({
              ...matchingOptions,
              minMatchScore: value[0],
            })
          }
        />
      </div>
    </div>
  );
};

export default FiltersTab;
