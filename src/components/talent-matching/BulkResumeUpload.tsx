
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useFileUpload } from "@/hooks/talent-matching/use-file-upload";
import { useResumeParser } from "@/hooks/talent-matching/use-resume-parser";
import BulkUpload from "./data-acquisition/import/BulkUpload";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  
  const {
    bulkFiles,
    setBulkFiles,
    uploadProgress,
    setUploadProgress,
    isUploading,
    setIsUploading,
    error,
    setError,
    handleFileUpload
  } = useFileUpload((results) => {
    // This callback will be executed after files are parsed
    setUploadComplete(true);
    setIsProcessing(false);
  });

  const {
    parsedResults,
    setParsedResults,
    parseResumes,
    parseBulkResumes
  } = useResumeParser();

  const handleBulkUpload = async () => {
    if (bulkFiles.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please select files to upload",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    setIsUploading(true);
    setError(null);
    
    try {
      const sourceName = "Uploaded Resumes";
      await parseBulkResumes(bulkFiles, sourceName);
      
      // Update progress for visual feedback
      for (let progress = 0; progress <= 100; progress += 10) {
        setUploadProgress(progress);
        if (progress < 100) {
          await new Promise(resolve => setTimeout(resolve, 200)); // Simulate processing time
        }
      }
      
      toast({
        title: "Upload Complete",
        description: `Successfully processed ${bulkFiles.length} resumes`,
      });
      
      setUploadComplete(true);
      onUploadComplete();
    } catch (error) {
      console.error("Error processing files:", error);
      setError("Failed to process uploaded files. Please try again.");
      toast({
        title: "Upload Failed",
        description: "There was an error processing your files",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setIsProcessing(false);
    }
  };

  const resetUpload = () => {
    setBulkFiles([]);
    setUploadProgress(0);
    setUploadComplete(false);
    setError(null);
  };

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
          <div className="py-6 text-center space-y-4">
            <CheckCircle2 className="h-16 w-16 mx-auto text-green-500" />
            <h3 className="text-lg font-medium">Upload Complete!</h3>
            <p className="text-muted-foreground">
              Your resumes have been successfully processed and are ready for AI matching.
            </p>
            <Button onClick={handleClose} className="mt-4">
              Continue to Matching
            </Button>
          </div>
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
          <div className="border-2 border-dashed rounded-lg p-10 text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Upload className="h-12 w-12 text-gray-400" />
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Upload Resumes</h3>
                <p className="text-sm text-gray-500">
                  Drag and drop your files here, or click to browse
                </p>
                <p className="text-xs text-gray-400">
                  Supported formats: PDF, DOCX, TXT
                </p>
              </div>
              
              <input
                type="file"
                id="bulk-resume-upload"
                className="hidden"
                accept=".pdf,.docx,.txt"
                multiple
                onChange={(e) => handleFileUpload(Array.from(e.target.files || []))}
              />
              
              <Button asChild>
                <label htmlFor="bulk-resume-upload" className="cursor-pointer">Browse Files</label>
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BulkResumeUpload;
