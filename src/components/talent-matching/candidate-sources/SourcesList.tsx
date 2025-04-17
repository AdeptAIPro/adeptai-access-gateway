
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import SourceItem from "./SourceItem";

interface SourcesListProps {
  sources: string[];
  selectedSources: string[];
  isLoading: boolean;
  onSourceChange: (source: string, checked: boolean) => void;
}

const SourcesList: React.FC<SourcesListProps> = ({
  sources,
  selectedSources,
  isLoading,
  onSourceChange,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {sources.map((source) => (
        <SourceItem
          key={source}
          source={source}
          isSelected={selectedSources.includes(source)}
          onChange={onSourceChange}
        />
      ))}
    </div>
  );
};

export default SourcesList;
