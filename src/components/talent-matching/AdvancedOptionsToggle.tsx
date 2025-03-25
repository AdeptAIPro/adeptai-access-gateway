
import React from "react";
import { MatchingOptions } from "./types";
import AdvancedMatchingOptions from "./AdvancedMatchingOptions";

interface AdvancedOptionsToggleProps {
  showAdvancedOptions: boolean;
  matchingOptions: MatchingOptions;
  setMatchingOptions: (options: MatchingOptions) => void;
}

const AdvancedOptionsToggle: React.FC<AdvancedOptionsToggleProps> = ({
  showAdvancedOptions,
  matchingOptions,
  setMatchingOptions
}) => {
  if (!showAdvancedOptions) {
    return null;
  }

  return (
    <div className="w-full mt-4">
      <AdvancedMatchingOptions 
        matchingOptions={matchingOptions}
        setMatchingOptions={setMatchingOptions}
      />
    </div>
  );
};

export default AdvancedOptionsToggle;
