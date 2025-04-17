
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Globe } from "lucide-react";
import SourceCategoryTabs from "./candidate-sources/SourceCategoryTabs";
import SourcesList from "./candidate-sources/SourcesList";
import UploadedResumesSource from "./candidate-sources/UploadedResumesSource";
import { useSourceSelection } from "./candidate-sources/useSourceSelection";

interface TargetSourceSelectionProps {
  selectedSources: string[];
  setSelectedSources: (sources: string[]) => void;
  onShowBulkUpload?: () => void;
  bulkUploaded?: boolean;
}

const TargetSourceSelection: React.FC<TargetSourceSelectionProps> = ({
  selectedSources,
  setSelectedSources,
  onShowBulkUpload,
  bulkUploaded = false
}) => {
  const {
    sources,
    isLoading,
    activeTab,
    setActiveTab,
    handleSourceChange
  } = useSourceSelection(selectedSources);

  // Handle source change and propagate to parent
  const onSourceChange = (source: string, checked: boolean) => {
    handleSourceChange(source, checked);
    // No need to call setSelectedSources directly as it's handled in handleSourceChange
  };

  return (
    <Card className="mt-6 border-adept/20 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Globe className="h-5 w-5 mr-2 text-adept" />
          Candidate Sources
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">
          Select talent pools to search for matching candidates
        </div>
        
        <SourceCategoryTabs 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        <UploadedResumesSource
          isSelected={selectedSources.includes("Uploaded Resumes")}
          onChange={onSourceChange}
          onShowBulkUpload={onShowBulkUpload}
          bulkUploaded={bulkUploaded}
        />
        
        <SourcesList
          sources={sources}
          selectedSources={selectedSources}
          isLoading={isLoading}
          onSourceChange={onSourceChange}
        />
      </CardContent>
    </Card>
  );
};

export default TargetSourceSelection;
