
import { extractSkillsFromJobDescription } from "@/hooks/talent-matching/matching-utils";

export interface ProcessedJobDescription {
  extractedTitle?: string;
  extractedSkills?: string[];
  suggestedExperience: number;
  keyResponsibilities?: string[];
}

export const processJobDescription = async (jobDescription: string): Promise<ProcessedJobDescription> => {
  // Extract a title from the first few words
  const extractedTitle = jobDescription.split('\n')[0]?.trim() || 
    jobDescription.substring(0, 30).trim();
  
  // Extract skills
  const extractedSkills = extractSkillsFromJobDescription(jobDescription);
  
  // Simple heuristic to estimate experience level based on keywords
  const juniorTerms = ['entry-level', 'junior', 'associate', '0-2 years', '1-3 years', 'intern', 'trainee'];
  const midTerms = ['mid-level', 'intermediate', '2-5 years', '3-5 years', 'experienced'];
  const seniorTerms = ['senior', 'lead', 'principal', '5+ years', '6+ years', '7+ years', 'manager', 'director'];
  
  let suggestedExperience = 2;
  
  if (seniorTerms.some(term => jobDescription.toLowerCase().includes(term))) {
    suggestedExperience = 5;
  } else if (midTerms.some(term => jobDescription.toLowerCase().includes(term))) {
    suggestedExperience = 3;
  } else if (juniorTerms.some(term => jobDescription.toLowerCase().includes(term))) {
    suggestedExperience = 1;
  }
  
  // Extract key responsibilities
  const keyResponsibilities = jobDescription
    .split(/\n|\./)
    .filter(line => line.trim().length > 20)
    .filter(line => 
      line.toLowerCase().includes('responsible') || 
      line.toLowerCase().includes('duties') || 
      line.toLowerCase().includes('will') || 
      line.toLowerCase().includes('tasks')
    )
    .map(line => line.trim())
    .slice(0, 5);
  
  return {
    extractedTitle,
    extractedSkills,
    suggestedExperience,
    keyResponsibilities
  };
};
