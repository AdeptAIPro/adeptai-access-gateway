
import React, { useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, AlertCircle, Check, FileUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";

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
      // Simulate progress updates
      const timer = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 95) {
            clearInterval(timer);
            return 95;
          }
          return prev + 5;
        });
      }, 200);
      
      await onBulkUpload(bulkFiles);
      clearInterval(timer);
      setUploadProgress(100);
      
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
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  return (
    <Card className="p-6 border-slate-200">
      <div className="border-2 border-dashed rounded-lg p-10 text-center bg-slate-50 hover:bg-slate-100 transition-colors">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="bg-blue-100 p-4 rounded-full">
            <Upload className="h-12 w-12 text-blue-600" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Upload Job Description</h3>
            <p className="text-sm text-gray-500">
              Drag and drop your files here, or click to browse
            </p>
            <p className="text-xs text-gray-400">
              Supported formats: PDF, DOCX, TXT (Max 100MB per file)
            </p>
          </div>
          
          <Input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".pdf,.docx,.txt"
            onChange={handleFileUpload}
            multiple
          />
          
          <Button asChild className="gap-2">
            <label htmlFor="file-upload" className="cursor-pointer">
              <FileUp className="h-4 w-4" />
              Browse Files
            </label>
          </Button>

          {bulkFiles.length > 0 && (
            <div className="w-full space-y-4">
              <div className="bg-white p-4 rounded-md shadow-sm border">
                <h4 className="font-medium mb-2 flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-blue-500" />
                  {bulkFiles.length} Files Selected
                </h4>
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {bulkFiles.map((file, index) => (
                    <div key={index} className="flex items-center text-sm p-2 bg-slate-50 rounded">
                      <FileText className="h-4 w-4 mr-2 text-blue-500" />
                      <span className="truncate flex-grow">{file.name}</span>
                      <span className="ml-2 text-gray-400 text-xs">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </div>
                  ))}
                </div>
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <Progress value={uploadProgress} className="h-2" />
                  <p className="text-sm text-gray-500 flex justify-between">
                    <span>Uploading files...</span>
                    <span>{uploadProgress}%</span>
                  </p>
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
                variant={uploadProgress === 100 ? "outline" : "default"}
              >
                {uploadProgress === 100 ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Upload Complete
                  </>
                ) : isUploading ? (
                  'Uploading...'
                ) : (
                  'Start Upload'
                )}
              </Button>
            </div>
          )}

          {fileUploaded && !bulkFiles.length && (
            <div className="flex items-center p-3 bg-white rounded-md border w-full">
              <FileText className="h-5 w-5 mr-3 text-blue-500" />
              <div className="flex-grow">
                <div className="text-sm font-medium">{fileUploaded.name}</div>
                <div className="text-xs text-gray-500">{(fileUploaded.size / 1024 / 1024).toFixed(2)} MB • Ready for matching</div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setFileUploaded(null)}
                className="text-gray-500 hover:text-red-500"
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded text-sm text-amber-800">
        <p className="flex items-center font-medium">
          <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
          Premium Feature
        </p>
        <p className="mt-1 pl-6">
          Bulk uploading and advanced document parsing is available with our Premium plan.
          <Button 
            variant="link" 
            className="text-amber-600 hover:text-amber-800 p-0 h-auto ml-1"
            onClick={() => window.location.href = '/pricing'}
          >
            Learn more
          </Button>
        </p>
      </div>
    </Card>
  );
};

export default UploadDocumentTab;
