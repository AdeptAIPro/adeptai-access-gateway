
import { JobAnalysisResult } from '../types/CrossSourceTypes';

export const analyzeJobDescription = (jobDescription: string): JobAnalysisResult => {
  // In a real implementation, this would use NLP or ML to extract job details
  // For demo purposes, we're using a simplified approach
  
  return {
    requiredSkills: extractRequiredSkills(jobDescription),
    preferredSkills: extractPreferredSkills(jobDescription),
    experienceLevel: extractExperienceLevel(jobDescription),
    locations: extractLocations(jobDescription),
    jobTitle: extractJobTitle(jobDescription),
    jobDescription: jobDescription,
    keyResponsibilities: extractKeyResponsibilities(jobDescription),
    suggestedExperience: extractExperienceLevel(jobDescription) // Added this field
  };
};

// Helper functions to extract job information
const extractRequiredSkills = (jobDescription: string): string[] => {
  // In a real implementation, this would use NLP to identify required skills
  const commonSkills = [
    "JavaScript", "React", "Angular", "Vue", "TypeScript",
    "Node.js", "Python", "Java", "C#", "SQL", "NoSQL", 
    "AWS", "Azure", "GCP", "Docker", "Kubernetes",
    "GraphQL", "REST API", "Git", "CI/CD"
  ];
  
  return commonSkills.filter(skill => 
    jobDescription.toLowerCase().includes(skill.toLowerCase())
  ).slice(0, 5); // Return up to 5 skills for demo
};

const extractPreferredSkills = (jobDescription: string): string[] => {
  // Similar to required skills, but we're picking different ones for demo
  const additionalSkills = [
    "Redux", "Jest", "Testing Library", "Cypress", "Playwright",
    "Webpack", "Babel", "ESLint", "Prettier", "Storybook",
    "SASS", "LESS", "Tailwind CSS", "MongoDB", "PostgreSQL",
    "Redis", "ElasticSearch", "Kafka", "RabbitMQ", "Microservices"
  ];
  
  return additionalSkills.filter(skill => 
    jobDescription.toLowerCase().includes(skill.toLowerCase())
  ).slice(0, 3); // Return up to 3 skills for demo
};

const extractExperienceLevel = (jobDescription: string): number => {
  // In a real implementation, this would analyze the text to determine years of experience
  if (jobDescription.toLowerCase().includes("senior")) return 5;
  if (jobDescription.toLowerCase().includes("mid")) return 3;
  if (jobDescription.toLowerCase().includes("junior")) return 1;
  return 2; // Default experience level
};

const extractLocations = (jobDescription: string): string[] => {
  // In a real implementation, this would extract locations from the text
  const locations = ["Remote", "San Francisco", "New York", "Austin", "Seattle"];
  
  for (const location of locations) {
    if (jobDescription.includes(location)) {
      return [location];
    }
  }
  
  return ["Remote"]; // Default location
};

const extractJobTitle = (jobDescription: string): string => {
  // In a real implementation, this would extract the job title from the text
  if (jobDescription.toLowerCase().includes("full stack")) return "Full Stack Developer";
  if (jobDescription.toLowerCase().includes("front")) return "Frontend Developer";
  if (jobDescription.toLowerCase().includes("back")) return "Backend Developer";
  if (jobDescription.toLowerCase().includes("devops")) return "DevOps Engineer";
  return "Software Engineer"; // Default job title
};

const extractKeyResponsibilities = (jobDescription: string): string[] => {
  // In a real implementation, this would extract responsibilities from the text
  return [
    "Develop and maintain web applications",
    "Collaborate with cross-functional teams",
    "Write clean, maintainable code",
    "Participate in code reviews",
    "Troubleshoot and debug issues"
  ];
};
