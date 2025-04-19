
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const useBulkResumeUpload = (onUploadComplete: () => void) => {
  const { toast } = useToast();
  const [uploadComplete, setUploadComplete] = useState(false);
  const [bulkFiles, setBulkFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (files: File[]) => {
    // Validate file types
    const validFileTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"];
    const invalidFiles = files.filter(file => !validFileTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      toast({
        title: "Invalid File Type",
        description: "Only PDF, DOC, DOCX, and TXT files are supported",
        variant: "destructive",
      });
      return;
    }
    
    setBulkFiles(files);
    
    toast({
      title: "Files Selected",
      description: `${files.length} files ready to upload`,
    });
  };

  const handleBulkUpload = async () => {
    if (bulkFiles.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please select files to upload",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    setError(null);
    
    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 500);
    
    try {
      // In a real implementation, this would call your API to upload the files
      // For now, we'll simulate an upload delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Set progress to 100%
      setUploadProgress(100);
      
      // Clear the interval
      clearInterval(progressInterval);
      
      // Show success message
      toast({
        title: "Upload Complete",
        description: `Successfully processed ${bulkFiles.length} resumes`,
      });
      
      setUploadComplete(true);
      onUploadComplete();
    } catch (error) {
      console.error("Error uploading files:", error);
      setError("Failed to upload files. Please try again.");
      
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your files",
        variant: "destructive",
      });
    } finally {
      clearInterval(progressInterval);
      setIsUploading(false);
    }
  };

  const resetUpload = () => {
    setBulkFiles([]);
    setUploadProgress(0);
    setUploadComplete(false);
    setError(null);
  };

  return {
    uploadComplete,
    bulkFiles,
    uploadProgress,
    isUploading,
    error,
    handleBulkUpload,
    resetUpload,
    handleFileSelect
  };
};
