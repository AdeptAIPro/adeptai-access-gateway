
import React from "react";
import { SavedResultCard } from "./saved-results/SavedResultCard";
import { NoResults } from "./saved-results/NoResults";
import type { MatchingSavedResultsProps } from "./types/saved-results.types";

const MatchingSavedResults: React.FC<MatchingSavedResultsProps> = ({
  savedResults,
  onLoad,
  onDelete,
  onExport,
  onToggleFavorite,
}) => {
  if (!savedResults || savedResults.length === 0) {
    return <NoResults />;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Saved Matching Results</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {savedResults.map((result) => (
          <SavedResultCard
            key={result.id}
            result={result}
            onLoad={onLoad}
            onDelete={onDelete}
            onExport={onExport}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default MatchingSavedResults;
