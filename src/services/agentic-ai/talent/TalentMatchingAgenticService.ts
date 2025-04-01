
import { AgentTask } from "../types/AgenticTypes";
import agenticDatabaseService from "../database/AgenticDatabaseService";
import { rankCandidates } from "./utils/CandidateRanking";
import { generateMatchingInsights } from "./utils/InsightsGenerator";
import { generateNextSteps } from "./utils/NextStepsGenerator";
import { TalentMatchingTaskParams } from './types/TalentMatchingTypes';

const processTalentMatchingTask = async (task: AgentTask): Promise<AgentTask> => {
  console.log(`Processing talent matching task: ${task.id}`);
  
  // Mark task as processing
  const updatedTask = { ...task, status: "processing" as const };
  
  try {
    // Simulating matching process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Ensure we have jobDescription in params
    const params = task.params as TalentMatchingTaskParams;
    if (!params.jobDescription) {
      throw new Error("Missing required parameter: jobDescription");
    }
    
    const candidates = await fetchCandidates(params.jobDescription);
    
    // Job analysis parameters
    const jobAnalysis = {
      suggestedExperience: 3,
      companyValues: ["innovation", "teamwork", "customer-focus"]
    };
    
    const requiredSkills = params.requiredSkills || [];
    const preferredSkills = params.preferredSkills || [];
    const prioritizeCulturalFit = params.prioritizeCulturalFit || false;
    
    const rankedCandidates = rankCandidates(
      candidates, 
      requiredSkills, 
      preferredSkills, 
      prioritizeCulturalFit,
      jobAnalysis
    );
    
    const insights = generateMatchingInsights(rankedCandidates, params);
    const nextSteps = generateNextSteps(rankedCandidates.length > 0, params);
    
    // Update task with candidates, insights, and next steps
    return {
      ...updatedTask,
      status: "completed",
      result: {
        candidates: rankedCandidates,
        insights,
        nextSteps
      }
    };
  } catch (error) {
    console.error(`Error processing talent matching task: ${error}`);
    return {
      ...updatedTask,
      status: "failed",
      error: `Failed to process task: ${error}`
    };
  }
};

const fetchCandidates = async (jobDescription: string) => {
  try {
    console.log(`Fetching candidates for job: ${jobDescription.substring(0, 20)}...`);
    
    // Query the database for candidates using agenticDatabaseService instead of direct executeQuery
    const candidatesResult = await agenticDatabaseService.executeQuery(
      "SELECT * FROM candidates WHERE status = 'active' LIMIT 10"
    );
    
    // Simulate some processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock data if no results from the database
    if (!candidatesResult || candidatesResult.length === 0) {
      return mockCandidates;
    }
    
    return candidatesResult.map((candidate: any) => ({
      id: candidate.id,
      name: candidate.name,
      skills: candidate.skills || [],
      experience: candidate.experience || [],
      education: candidate.education || [],
      matchScore: Math.floor(Math.random() * 40) + 60 // Random score between 60-99
    }));
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return mockCandidates;
  }
};

const mockCandidates = [
  {
    id: "c1",
    name: "Jane Smith",
    skills: ["JavaScript", "React", "TypeScript", "Node.js"],
    experience: [
      "Senior Frontend Developer at Tech Co (2020-present)",
      "Frontend Developer at App Inc (2018-2020)"
    ],
    education: ["B.S. Computer Science, University of Technology"],
    matchScore: 95
  },
  {
    id: "c2",
    name: "Michael Johnson",
    skills: ["JavaScript", "Angular", "Java", "Spring Boot"],
    experience: [
      "Full Stack Developer at Software Solutions Ltd (2019-present)",
      "Backend Developer at Enterprise Apps (2016-2019)"
    ],
    education: ["M.S. Software Engineering, State University"],
    matchScore: 88
  },
  {
    id: "c3",
    name: "Emily Davis",
    skills: ["JavaScript", "Vue.js", "Python", "Django"],
    experience: [
      "Web Developer at Creative Agency (2018-present)",
      "Junior Developer at Tech Startups Inc (2017-2018)"
    ],
    education: ["B.A. Web Development, Design Institute"],
    matchScore: 75
  }
];

export { processTalentMatchingTask };
