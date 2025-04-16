
import { useState } from 'react';
import { parseResumeText } from '@/services/talent/TalentDataAcquisitionService';
import { ResumeParsingResult } from '@/components/talent-matching/types';
import { useToast } from '@/hooks/use-toast';

export const useResumeParser = () => {
  const { toast } = useToast();
  const [parsedResults, setParsedResults] = useState<ResumeParsingResult[]>([]);

  const parseResumes = async (
    text: string,
    sourceName: string,
    sourceUrl?: string
  ) => {
    try {
      const result = await parseResumeText(text, sourceName, sourceUrl);
      setParsedResults([result]);
      return result;
    } catch (error) {
      console.error("Error parsing resume:", error);
      toast({
        title: "Error",
        description: "Failed to parse resume text",
        variant: "destructive",
      });
      return null;
    }
  };

  const parseBulkResumes = async (
    files: File[],
    sourceName: string
  ): Promise<ResumeParsingResult[]> => {
    const results: ResumeParsingResult[] = [];
    
    for (const file of files) {
      try {
        const text = await file.text();
        const result = await parseResumeText(text, sourceName);
        results.push(result);
      } catch (error) {
        console.error("Error parsing file:", file.name, error);
      }
    }
    
    setParsedResults(results);
    return results;
  };

  return {
    parsedResults,
    setParsedResults,
    parseResumes,
    parseBulkResumes
  };
};
