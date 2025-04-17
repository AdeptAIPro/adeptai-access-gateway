
import React from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import SourceItem from "./SourceItem";

interface UploadedResumesSourceProps {
  isSelected: boolean;
  onChange: (source: string, checked: boolean) => void;
  onShowBulkUpload?: () => void;
  bulkUploaded?: boolean;
}

const UploadedResumesSource: React.FC<UploadedResumesSourceProps> = ({
  isSelected,
  onChange,
  onShowBulkUpload,
  bulkUploaded = false,
}) => {
  return (
    <div className="mb-4">
      <div className="flex items-center space-x-2 mb-3">
        <SourceItem 
          source="Uploaded Resumes"
          isSelected={isSelected}
          onChange={onChange}
          showBadge={bulkUploaded}
          badgeText="Resumes Added"
        />
      </div>
      
      {onShowBulkUpload && isSelected && !bulkUploaded && (
        <Button 
          variant="outline" 
          size="sm" 
          className="ml-6 mb-3"
          onClick={onShowBulkUpload}
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Resumes
        </Button>
      )}
    </div>
  );
};

export default UploadedResumesSource;
