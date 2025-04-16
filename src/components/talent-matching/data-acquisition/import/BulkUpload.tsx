
import React from "react";
import { FileText, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ResumeParsingResult } from "@/components/talent-matching/types";

interface BulkUploadProps {
  files: File[];
  uploadProgress: number;
  isUploading: boolean;
  error: string | null;
  onUpload: () => Promise<void>;
  onCancel: () => void;
}

const BulkUpload: React.FC<BulkUploadProps> = ({
  files,
  uploadProgress,
  isUploading,
  error,
  onUpload,
  onCancel,
}) => {
  return (
    <div className="w-full space-y-4">
      <div className="bg-gray-50 p-4 rounded-md">
        <h4 className="font-medium mb-2">{files.length} Files Selected</h4>
        <div className="max-h-40 overflow-y-auto space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center text-sm">
              <FileText className="h-4 w-4 mr-2 text-blue-500" />
              <span className="truncate">{file.name}</span>
              <span className="ml-2 text-gray-400">
                ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </div>
          ))}
        </div>
      </div>

      {isUploading && (
        <div className="space-y-2">
          <Progress value={uploadProgress} className="h-2" />
          <p className="text-sm text-gray-500">Uploading files...</p>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-end space-x-2">
        <Button 
          variant="outline" 
          onClick={onCancel}
          disabled={isUploading}
        >
          Cancel
        </Button>
        <Button 
          onClick={onUpload}
          disabled={isUploading}
        >
          Start Bulk Upload
        </Button>
      </div>
    </div>
  );
};

export default BulkUpload;
