
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import BulkUpload from "./data-acquisition/import/BulkUpload";
import FileDropZone from "./bulk-upload/FileDropZone";
import UploadComplete from "./bulk-upload/UploadComplete";
import { useBulkResumeUpload } from "@/hooks/talent-matching/use-bulk-resume-upload";

interface BulkResumeUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete: () => void;
}

const BulkResumeUpload: React.FC<BulkResumeUploadProps> = ({
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
    
    // Reset state if dialog is closed
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
            Upload multiple resumes to be included in your AI matching process
          </DialogDescription>
        </DialogHeader>
        
        {uploadComplete ? (
          <UploadComplete onContinue={handleClose} />
        ) : bulkFiles.length > 0 ? (
          <BulkUpload
            files={bulkFiles}
            uploadProgress={uploadProgress}
            isUploading={isUploading}
            error={error}
            onUpload={handleBulkUpload}
            onCancel={resetUpload}
          />
        ) : (
          <FileDropZone onFileSelect={handleFileSelect} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BulkResumeUpload;
