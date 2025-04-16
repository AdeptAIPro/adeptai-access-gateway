
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ResumeParsingResult } from '@/components/talent-matching/types';

export const useFileUpload = (
  onFilesParsed: (results: ResumeParsingResult[]) => void
) => {
  const { toast } = useToast();
  const [bulkFiles, setBulkFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (files: File[]) => {
    if (files.length === 1) {
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

  return {
    bulkFiles,
    setBulkFiles,
    uploadProgress,
    setUploadProgress,
    isUploading,
    setIsUploading,
    error,
    setError,
    handleFileUpload
  };
};
