
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Upload, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  bulkUploaded = false
}) => {
  return (
    <div className="border rounded-md p-4 mb-4 bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Checkbox
            id="uploaded-resumes"
            checked={isSelected}
            onCheckedChange={(checked) => onChange("Uploaded Resumes", !!checked)}
          />
          <label
            htmlFor="uploaded-resumes"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
          >
            <Upload className="h-4 w-4 mr-2 text-blue-500" />
            Uploaded Resumes
            {bulkUploaded && (
              <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200 flex items-center">
                <CheckCircle className="h-3 w-3 mr-1" /> Uploaded
              </Badge>
            )}
          </label>
        </div>
        
        {onShowBulkUpload && (
          <Button
            variant="outline"
            size="sm"
            onClick={onShowBulkUpload}
            className="text-xs"
          >
            Upload Resumes
          </Button>
        )}
      </div>
      
      <p className="text-xs text-muted-foreground mt-2 ml-7">
        Resumes you've uploaded directly through the platform
      </p>
    </div>
  );
};

export default UploadedResumesSource;
