
import React from "react";
import { MatchingOptions } from "./types";
import AdvancedMatchingOptions from "./AdvancedMatchingOptions";

interface AdvancedOptionsToggleProps {
  showAdvancedOptions: boolean;
  matchingOptions: MatchingOptions;
  setMatchingOptions: (options: MatchingOptions) => void;
  isPremiumFeatures?: {
    semanticMatching?: boolean;
    complianceVerification?: boolean;
    culturalFitAnalysis?: boolean;
    advancedFiltering?: boolean;
    [key: string]: boolean | undefined;
  };
}

const AdvancedOptionsToggle: React.FC<AdvancedOptionsToggleProps> = ({
  showAdvancedOptions,
  matchingOptions,
  setMatchingOptions,
  isPremiumFeatures
}) => {
  if (!showAdvancedOptions) {
    return null;
  }

  return (
    <div className="w-full mt-4">
      <AdvancedMatchingOptions 
        matchingOptions={matchingOptions}
        setMatchingOptions={setMatchingOptions}
        isPremiumFeatures={isPremiumFeatures}
      />
    </div>
  );
};

export default AdvancedOptionsToggle;
