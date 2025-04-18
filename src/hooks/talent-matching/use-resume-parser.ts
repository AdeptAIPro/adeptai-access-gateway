
import { useState } from 'react';
import { ResumeParsingResult } from '@/components/talent-matching/types';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

export const useResumeParser = () => {
  const { toast } = useToast();
  const [parsedResults, setParsedResults] = useState<ResumeParsingResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Function to parse a single text resume
  const parseResumes = async (
    resumeText: string, 
    sourceName: string,
    sourceUrl?: string
  ): Promise<boolean> => {
    setIsProcessing(true);
    
    try {
      // This would typically call an API to parse the resume
      // For now, we'll simulate parsing with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Sample parsed result (in a real app, this would come from the parser API)
      const result: ResumeParsingResult = {
        id: uuidv4(),
        filename: `${sourceName}-resume.txt`,
        parsed: true,
        name: "Sample Candidate",
        candidateName: "Sample Candidate",
        email: "candidate@example.com",
        phone: "555-123-4567",
        skills: ["JavaScript", "React", "TypeScript"],
        extractedSkills: ["JavaScript", "React", "TypeScript"],
        experience: ["5 years at Example Corp"],
        education: ["Bachelor's in Computer Science"],
        location: "San Francisco, CA",
        inferredExperience: 5,
        originalText: resumeText,
        source: sourceName,
        sourceUrl: sourceUrl
      };
      
      setParsedResults([result]);
      return true;
    } catch (error) {
      console.error("Error parsing resume:", error);
      toast({
        title: "Error",
        description: "Failed to parse resume text",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  // Function to parse multiple file resumes
  const parseBulkResumes = async (
    files: File[],
    sourceName: string
  ): Promise<boolean> => {
    setIsProcessing(true);
    
    try {
      // In a real app, we would upload and parse each file
      // Here we'll simulate with a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate sample results for each file
      const results: ResumeParsingResult[] = files.map((file, index) => ({
        id: uuidv4(),
        filename: file.name,
        parsed: true,
        name: `Candidate ${index + 1}`,
        candidateName: `Candidate ${index + 1}`,
        email: `candidate${index + 1}@example.com`,
        phone: `555-123-${4567 + index}`,
        skills: ["JavaScript", "React", "Node.js", "TypeScript"].slice(0, 3 + (index % 2)),
        extractedSkills: ["JavaScript", "React", "Node.js", "TypeScript"].slice(0, 3 + (index % 2)),
        experience: [`${3 + index} years at Example Corp`],
        education: ["Bachelor's in Computer Science"],
        location: index % 2 === 0 ? "San Francisco, CA" : "New York, NY",
        inferredExperience: 3 + index,
        originalText: `Sample resume text for ${file.name}`,
        source: sourceName
      }));
      
      setParsedResults(results);
      return true;
    } catch (error) {
      console.error("Error parsing resumes:", error);
      toast({
        title: "Error",
        description: "Failed to parse resume files",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    parsedResults,
    setParsedResults,
    isProcessing,
    parseResumes,
    parseBulkResumes
  };
};
