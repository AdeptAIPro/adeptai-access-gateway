
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Upload, FileText, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import FileDropZone from "./FileDropZone";
import { useBulkResumeUpload } from "@/hooks/talent-matching/use-bulk-resume-upload";

interface BulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete: () => void;
}

const BulkUploadModal: React.FC<BulkUploadModalProps> = ({
  isOpen,
  onClose,
  onUploadComplete
}) => {
  const {
    uploadComplete,
    bulkFiles,
    uploadProgress,
    isUploading,
    error,
    handleBulkUpload,
    resetUpload,
    handleFileSelect
  } = useBulkResumeUpload(onUploadComplete);

  const handleClose = () => {
    onClose();
    if (!uploadComplete) {
      resetUpload();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Upload className="mr-2 h-5 w-5" />
            Bulk Resume Upload
          </DialogTitle>
          <DialogDescription>
            Upload multiple resumes to add candidates to your talent pool
          </DialogDescription>
        </DialogHeader>
        
        {uploadComplete ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle2 className="h-16 w-16 mx-auto text-green-500" />
            <h3 className="text-xl font-medium">Upload Complete!</h3>
            <p className="text-muted-foreground">
              Your resumes have been processed and added to your Internal Database
            </p>
            <Button onClick={handleClose}>Continue</Button>
          </div>
        ) : bulkFiles.length > 0 ? (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">{bulkFiles.length} Files Selected</h4>
              <div className="max-h-40 overflow-y-auto space-y-2">
                {bulkFiles.map((file, index) => (
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
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500">Processing files...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-start">
                <XCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={resetUpload}
                disabled={isUploading}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleBulkUpload}
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Start Upload"}
              </Button>
            </div>
          </div>
        ) : (
          <FileDropZone onFileSelect={handleFileSelect} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BulkUploadModal;
