
import React, { useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface UploadDocumentTabProps {
  fileUploaded: File | null;
  setFileUploaded: (file: File | null) => void;
  onBulkUpload?: (files: File[]) => Promise<void>;
}

const UploadDocumentTab: React.FC<UploadDocumentTabProps> = ({
  fileUploaded,
  setFileUploaded,
  onBulkUpload
}) => {
  const { toast } = useToast();
  const [bulkFiles, setBulkFiles] = React.useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [isUploading, setIsUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 1) {
      setFileUploaded(files[0]);
      toast({
        title: "File Selected",
        description: `${files[0].name} has been selected`,
      });
    } else if (files.length > 1) {
      setBulkFiles(files);
      toast({
        title: "Files Selected",
        description: `${files.length} files selected for bulk upload`,
      });
    }
  };

  const handleBulkUpload = async () => {
    if (!onBulkUpload || bulkFiles.length === 0) return;

    setIsUploading(true);
    setError(null);
    
    try {
      await onBulkUpload(bulkFiles);
      toast({
        title: "Upload Complete",
        description: `Successfully uploaded ${bulkFiles.length} files`,
      });
      setBulkFiles([]);
    } catch (err) {
      setError("Failed to upload files. Please try again.");
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your files",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="border-2 border-dashed rounded-lg p-10 text-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Upload className="h-12 w-12 text-gray-400" />
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Upload Resumes</h3>
          <p className="text-sm text-gray-500">
            Drag and drop your files here, or click to browse
          </p>
          <p className="text-xs text-gray-400">
            Supported formats: PDF, DOCX, TXT (Max 100MB per file)
          </p>
          <p className="text-xs text-gray-400">
            For bulk uploads, you can select multiple files
          </p>
        </div>
        
        <Input
          type="file"
          id="file-upload"
          className="hidden"
          accept=".pdf,.docx,.txt"
          multiple
          onChange={handleFileUpload}
        />
        
        <Button asChild>
          <label htmlFor="file-upload" className="cursor-pointer">Browse Files</label>
        </Button>

        {bulkFiles.length > 0 && (
          <div className="w-full space-y-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">{bulkFiles.length} Files Selected</h4>
              <div className="max-h-40 overflow-y-auto space-y-2">
                {bulkFiles.map((file, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <FileText className="h-4 w-4 mr-2 text-blue-500" />
                    <span className="truncate">{file.name}</span>
                    <span className="ml-2 text-gray-400">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
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

            <Button 
              onClick={handleBulkUpload} 
              disabled={isUploading}
              className="w-full"
            >
              {isUploading ? 'Uploading...' : 'Start Bulk Upload'}
            </Button>
          </div>
        )}

        {fileUploaded && !bulkFiles.length && (
          <div className="flex items-center p-2 bg-gray-100 rounded-md">
            <FileText className="h-4 w-4 mr-2 text-blue-500" />
            <span className="text-sm">{fileUploaded.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadDocumentTab;
