
import { useState } from 'react';
import { ImportFormValues } from '@/components/talent-matching/types';
import { useToast } from '@/hooks/use-toast';
import { ImportStats } from '@/components/talent-matching/types';
import { useResumeParser } from '@/hooks/talent-matching/use-resume-parser';

export const useImportSubmission = (
  onImportComplete: (stats: ImportStats) => void
) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  
  const {
    parsedResults,
    setParsedResults,
    parseResumes,
    parseBulkResumes
  } = useResumeParser();

  const handleSubmitText = async (data: ImportFormValues) => {
    setIsProcessing(true);
    setParsedResults([]);
    setPreviewMode(false);
    
    try {
      if (data.resumeText) {
        const result = await parseResumes(data.resumeText, data.sourceName, data.sourceUrl);
        if (result) {
          setPreviewMode(true);
        }
      } else {
        toast({
          title: "No Data",
          description: "Please provide resume text to parse",
          variant: "destructive",
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBulkUpload = async (
    bulkFiles: File[], 
    sourceName: string
  ) => {
    setIsProcessing(true);
    setParsedResults([]);
    setPreviewMode(false);
    
    try {
      await parseBulkResumes(bulkFiles, sourceName);
      setPreviewMode(true);
    } catch (error) {
      console.error("Error processing files:", error);
      toast({
        title: "Error",
        description: "Failed to process uploaded files",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmImport = async (sourceName: string) => {
    if (parsedResults.length === 0) return;
    
    setIsProcessing(true);
    try {
      onImportComplete({
        totalProcessed: parsedResults.length,
        successfulImports: parsedResults.filter(r => !r.error).length,
        failedImports: parsedResults.filter(r => r.error).length,
        duplicatesFound: 0,
        enrichmentPerformed: parsedResults.length,
        startTime: new Date().toISOString(),
        endTime: new Date().toISOString(),
        sources: [sourceName],
      });
      
      setParsedResults([]);
      setPreviewMode(false);
      
      toast({
        title: "Import Complete",
        description: `Successfully imported ${parsedResults.length} resumes`,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    parsedResults,
    setParsedResults,
    isProcessing,
    previewMode,
    setPreviewMode,
    handleSubmitText,
    handleBulkUpload,
    handleConfirmImport
  };
};
