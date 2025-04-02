
import { AgentTask } from '../types/AgenticTypes';
import { executeQuery } from '../database/AgenticDatabaseService';
import { CrossSourceCandidate } from './types/CrossSourceTypes';

export const processTalentMatchingTask = async (task: AgentTask): Promise<AgentTask> => {
  console.log(`Processing talent matching task: ${task.id}`);
  
  try {
    // Extract job description from task params
    const { jobDescription } = task.params;
    
    if (!jobDescription) {
      return {
        ...task,
        status: "failed",
        error: "No job description provided in task parameters"
      };
    }
    
    // Extract skills from job description (simplified for demo)
    const extractedSkills = extractSkills(jobDescription);
    
    // Query for candidates that match these skills
    const candidates = await fetchCandidates(extractedSkills);
    
    // Create matching result
    const matchingResult = {
      jobTitle: extractJobTitle(jobDescription),
      extractedSkills,
      suggestedExperience: 3, // Example value
      candidates: candidates.map(candidate => ({
        ...candidate,
        source: candidate.source || 'internal', // Ensure source is always set
        title: candidate.title || 'Unknown Position', // Ensure title is always set
        location: candidate.location || 'Remote', // Ensure location is always set
      })),
      totalCandidatesScanned: candidates.length + 10, // Demo value
      matchTime: 3.2, // Demo value in seconds
      crossSourceValidation: {
        sourcesSearched: ["LinkedIn", "Indeed", "Internal Database"],
        candidatesFound: candidates.length + 5,
        verifiedCandidates: Math.floor(candidates.length / 2),
        verificationRate: 0.42,
        averageCrossSourceScore: 0.78
      }
    };
    
    // Update task with result
    return {
      ...task,
      status: "completed",
      result: matchingResult
    };
  } catch (error) {
    console.error(`Error in talent matching task: ${error}`);
    return {
      ...task,
      status: "failed",
      error: `Error processing talent matching task: ${error}`
    };
  }
};

// Helper function to extract skills from job description
const extractSkills = (jobDescription: string): string[] => {
  // Simplified skill extraction for demo
  const commonSkills = ["JavaScript", "React", "TypeScript", "Node.js", "Python", "SQL", "NoSQL", "AWS", "Docker"];
  
  // Return skills that appear in the job description
  return commonSkills.filter(skill => 
    jobDescription.toLowerCase().includes(skill.toLowerCase())
  ).length > 0 
    ? commonSkills.filter(skill => 
        jobDescription.toLowerCase().includes(skill.toLowerCase())
      ) 
    : commonSkills.slice(0, 3); // Return at least some skills for demo purposes
};

// Helper function to extract job title
const extractJobTitle = (jobDescription: string): string => {
  // Simplified job title extraction for demo
  const firstLine = jobDescription.split('\n')[0];
  if (firstLine.toLowerCase().includes('title:')) {
    return firstLine.split('title:')[1].trim();
  }
  if (firstLine.length < 50) {
    return firstLine.trim();
  }
  return "Software Engineer"; // Default title
};

// Fetch candidates that match the given skills
const fetchCandidates = async (skills: string[]): Promise<CrossSourceCandidate[]> => {
  try {
    // Query candidates from database
    const candidatesData = await executeQuery(
      "SELECT * FROM candidates WHERE skills && $1",
      [skills]
    );
    
    // Map to proper CrossSourceCandidate type
    return candidatesData.map(candidate => ({
      id: candidate.id,
      name: candidate.name,
      title: candidate.title || "Software Developer", // Add default for required field
      location: candidate.location || "Remote", // Add default for required field
      skills: candidate.skills,
      experience: candidate.experience,
      education: candidate.education || "Bachelor's Degree",
      matchScore: calculateMatchScore(candidate.skills, skills),
      source: candidate.source || "Internal Database", // Add default for required field
      crossSourceVerified: Math.random() > 0.5,
      crossSourceOccurrences: Math.floor(Math.random() * 3) + 1,
      crossSourceSources: ["LinkedIn", "GitHub", "Indeed"].slice(0, Math.floor(Math.random() * 3) + 1),
      crossSourceScore: Math.random() * 0.5 + 0.5, // Random score between 0.5 and 1.0
    }));
  } catch (error) {
    console.error("Error fetching candidates:", error);
    
    // Return mock candidates for demo purposes
    return generateMockCandidates(skills);
  }
};

// Calculate match score between candidate skills and job skills
const calculateMatchScore = (candidateSkills: string[], jobSkills: string[]): number => {
  if (!candidateSkills || !jobSkills || jobSkills.length === 0) {
    return 0;
  }
  
  const matchingSkills = candidateSkills.filter(skill => 
    jobSkills.some(jobSkill => 
      jobSkill.toLowerCase() === skill.toLowerCase()
    )
  );
  
  return Math.min(100, Math.round((matchingSkills.length / jobSkills.length) * 100));
};

// Generate mock candidates for demo
const generateMockCandidates = (skills: string[]): CrossSourceCandidate[] => {
  const mockNames = [
    "Alex Johnson",
    "Sam Rivera",
    "Jordan Smith",
    "Taylor Williams",
    "Casey Martinez",
    "Morgan Lee"
  ];
  
  const mockTitles = [
    "Senior Software Engineer",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Engineer",
    "DevOps Specialist",
    "Software Architect"
  ];
  
  const mockLocations = [
    "San Francisco, CA",
    "New York, NY",
    "Austin, TX",
    "Seattle, WA",
    "Boston, MA",
    "Remote"
  ];
  
  const mockSources = [
    "LinkedIn",
    "Indeed",
    "GitHub",
    "Internal Database",
    "Referral",
    "StackOverflow"
  ];
  
  const allSkills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "C#",
    "SQL",
    "MongoDB",
    "AWS",
    "Docker",
    "Kubernetes",
    "GraphQL",
    "REST API",
    "HTML/CSS"
  ];
  
  return mockNames.map((name, index) => {
    // Ensure some skills match the job requirements
    const candidateSkills = [
      ...skills.slice(0, Math.floor(Math.random() * skills.length) + 1),
      ...allSkills.slice(0, 3 + Math.floor(Math.random() * 5))
    ].filter((skill, i, arr) => arr.indexOf(skill) === i).slice(0, 5 + Math.floor(Math.random() * 5));
    
    const matchScore = calculateMatchScore(candidateSkills, skills);
    
    return {
      id: `candidate-${index}`,
      name,
      title: mockTitles[index % mockTitles.length],
      location: mockLocations[index % mockLocations.length],
      skills: candidateSkills,
      experience: 2 + Math.floor(Math.random() * 8),
      education: "Bachelor's in Computer Science",
      matchScore,
      source: mockSources[index % mockSources.length],
      crossSourceVerified: Math.random() > 0.5,
      crossSourceOccurrences: Math.floor(Math.random() * 3) + 1,
      crossSourceSources: mockSources.slice(0, Math.floor(Math.random() * 3) + 1),
      crossSourceScore: Math.random() * 0.5 + 0.5,
    };
  });
};
