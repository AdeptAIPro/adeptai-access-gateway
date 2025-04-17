
import { useState } from "react";
import { useFileUpload } from "./use-file-upload";
import { useResumeParser } from "./use-resume-parser";
import { useToast } from "@/hooks/use-toast";

export const useBulkResumeUpload = (onUploadComplete: () => void) => {
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
    setUploadComplete(true);
    setIsProcessing(false);
  });

  const {
    parsedResults,
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
          await new Promise(resolve => setTimeout(resolve, 200));
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

  const handleFileSelect = (files: File[]) => {
    handleFileUpload(files);
  };

  return {
    isProcessing,
    uploadComplete,
    setUploadComplete,
    bulkFiles,
    uploadProgress,
    isUploading,
    error,
    handleBulkUpload,
    resetUpload,
    handleFileSelect
  };
};
