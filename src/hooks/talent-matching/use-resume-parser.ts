
import { useState } from "react";
import { ResumeParsingResult } from "@/components/talent-matching/types";
import { useToast } from "@/hooks/use-toast";

export const useResumeParser = () => {
  const { toast } = useToast();
  const [parsedResults, setParsedResults] = useState<ResumeParsingResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const parseBulkResumes = async (files: File[], sourceName: string): Promise<ResumeParsingResult[]> => {
    setIsProcessing(true);
    
    try {
      // In a real app, this would be an API call to a resume parsing service
      // Here we're mocking the parsing process
      const results: ResumeParsingResult[] = await Promise.all(
        files.map(async (file) => {
          // Simulate parsing delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Create a mock result based on the file name
          const result: ResumeParsingResult = {
            id: Math.random().toString(36).substring(2, 15),
            filename: file.name,
            parsed: true,
            candidateName: file.name.split('.')[0].replace(/_/g, ' '),
            skills: ["JavaScript", "React", "TypeScript"],
            experience: ["Software Engineer", "Web Developer"],
            education: ["Computer Science"],
            contact: {
              email: `${file.name.split('.')[0].toLowerCase().replace(/ /g, '.')}@example.com`,
              phone: "+1234567890"
            }
          };
          
          return result;
        })
      );
      
      setParsedResults(prev => [...prev, ...results]);
      return results;
    } catch (error) {
      console.error("Error parsing resumes:", error);
      toast({
        title: "Error Parsing Resumes",
        description: "There was an error processing the uploaded resumes",
        variant: "destructive",
      });
      return [];
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    parsedResults,
    setParsedResults,
    isProcessing,
    parseBulkResumes,
  };
};
