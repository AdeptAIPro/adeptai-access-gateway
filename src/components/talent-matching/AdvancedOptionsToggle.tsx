
import React from "react";
import { MatchingOptions } from "./types";
import AdvancedMatchingOptions from "./AdvancedMatchingOptions";

interface AdvancedOptionsToggleProps {
  showAdvancedOptions: boolean;
  matchingOptions: MatchingOptions;
  setMatchingOptions: (options: MatchingOptions) => void;
  matchingModels: any[];
  useCrossSourceIntelligence: boolean;
  setUseCrossSourceIntelligence: (value: boolean) => void;
}

const AdvancedOptionsToggle: React.FC<AdvancedOptionsToggleProps> = ({
  showAdvancedOptions,
  matchingOptions,
  setMatchingOptions,
  matchingModels,
  useCrossSourceIntelligence,
  setUseCrossSourceIntelligence
}) => {
  if (!showAdvancedOptions) {
    return null;
  }

  return (
    <div className="w-full mt-4">
      <AdvancedMatchingOptions 
        matchingOptions={matchingOptions}
        setMatchingOptions={setMatchingOptions}
        matchingModels={matchingModels}
        useCrossSourceIntelligence={useCrossSourceIntelligence}
        setUseCrossSourceIntelligence={setUseCrossSourceIntelligence}
      />
    </div>
  );
};

export default AdvancedOptionsToggle;
