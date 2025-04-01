
import { AgentTask } from '../AgenticService';
import { searchTalents } from '@/services/talent/TalentSearchService';
import { processJobDescription } from '@/services/talent-matching/MatchingService';

export interface TalentMatchingTaskParams {
  jobDescription: string;
  jobTitle?: string;
  requiredSkills?: string[];
  preferredSkills?: string[];
  experienceLevel?: number;
  location?: string;
  remoteOption?: boolean;
  matchingAlgorithm?: string;
  prioritizeCulturalFit?: boolean;
  includeNearMatches?: boolean;
  maxCandidates?: number;
}

export async function processTalentMatchingTask(task: AgentTask): Promise<any> {
  try {
    const params = task.params as TalentMatchingTaskParams;
    
    // First, process the job description to extract key details
    const jobAnalysis = await processJobDescription(params.jobDescription);
    
    // Combine explicit requirements with extracted ones
    const searchSkills = [...(jobAnalysis.extractedSkills || []), ...(params.requiredSkills || [])];
    
    // Search for candidates matching the core requirements
    const candidates = await searchTalents({
      skills: searchSkills.slice(0, 5), // Use top 5 skills for broader results
      experience: params.experienceLevel || jobAnalysis.suggestedExperience,
      location: params.location,
      limit: 50 // Get a large pool to score and rank
    });
    
    // Score and rank candidates (in a real system, this would be more sophisticated)
    const rankedCandidates = rankCandidates(
      candidates.candidates, 
      searchSkills,
      params.preferredSkills || [],
      params.prioritizeCulturalFit || false,
      jobAnalysis
    );
    
    // Return the top matches based on maxCandidates
    return {
      matches: rankedCandidates.slice(0, params.maxCandidates || 10),
      jobAnalysis: {
        extractedTitle: jobAnalysis.extractedTitle || params.jobTitle,
        coreSkills: jobAnalysis.extractedSkills?.slice(0, 5) || [],
        suggestedExperience: jobAnalysis.suggestedExperience,
        keyResponsibilities: jobAnalysis.keyResponsibilities || []
      },
      matchingInsights: generateMatchingInsights(rankedCandidates, params),
      nextSteps: generateNextSteps(rankedCandidates.length > 0, params)
    };
  } catch (error) {
    console.error('Error processing talent matching task:', error);
    throw error;
  }
}

// Score and rank candidates based on job requirements
function rankCandidates(
  candidates: any[],
  requiredSkills: string[],
  preferredSkills: string[],
  prioritizeCulturalFit: boolean,
  jobAnalysis: any
): any[] {
  return candidates.map(candidate => {
    // Calculate skill match score
    const candidateSkills = candidate.skills || [];
    const requiredSkillsCount = requiredSkills.filter(skill => 
      candidateSkills.some((cSkill: string) => 
        cSkill.toLowerCase().includes(skill.toLowerCase())
      )
    ).length;
    
    const preferredSkillsCount = preferredSkills.filter(skill => 
      candidateSkills.some((cSkill: string) => 
        cSkill.toLowerCase().includes(skill.toLowerCase())
      )
    ).length;
    
    // Calculate experience match 
    const experienceScore = candidate.experience >= (jobAnalysis.suggestedExperience || 0) ? 1 : 
      (candidate.experience / (jobAnalysis.suggestedExperience || 1));
    
    // Calculate cultural fit score (placeholder - in real system this would be more sophisticated)
    // This could use ML models trained on successful hires
    const culturalFitScore = candidate.cultural_fit_score || Math.random() * 0.5 + 0.5; // Random score between 0.5-1
    
    // Calculate total score
    let totalScore = 0;
    totalScore += (requiredSkillsCount / Math.max(requiredSkills.length, 1)) * 50; // 50% of score
    totalScore += (preferredSkillsCount / Math.max(preferredSkills.length, 1)) * 20; // 20% of score
    totalScore += experienceScore * 20; // 20% of score
    
    if (prioritizeCulturalFit) {
      totalScore += culturalFitScore * 10; // 10% of score
    } else {
      // Boost skills score instead
      totalScore += (requiredSkillsCount / Math.max(requiredSkills.length, 1)) * 10;
    }
    
    // Return candidate with score
    return {
      ...candidate,
      matchScore: Math.min(Math.round(totalScore), 100),
      skillMatch: Math.round((requiredSkillsCount / Math.max(requiredSkills.length, 1)) * 100),
      experienceMatch: Math.round(experienceScore * 100),
      culturalFitScore: Math.round(culturalFitScore * 100),
      matchDetails: {
        matchedRequiredSkills: requiredSkills.filter(skill => 
          candidateSkills.some((cSkill: string) => 
            cSkill.toLowerCase().includes(skill.toLowerCase())
          )
        ),
        matchedPreferredSkills: preferredSkills.filter(skill => 
          candidateSkills.some((cSkill: string) => 
            cSkill.toLowerCase().includes(skill.toLowerCase())
          )
        ),
        missingSkills: requiredSkills.filter(skill => 
          !candidateSkills.some((cSkill: string) => 
            cSkill.toLowerCase().includes(skill.toLowerCase())
          )
        )
      }
    };
  })
  .sort((a, b) => b.matchScore - a.matchScore);
}

// Generate insights about the matching results
function generateMatchingInsights(rankedCandidates: any[], params: TalentMatchingTaskParams): any {
  // In a real implementation, this would use LLM to generate insights
  // For now, we'll provide dummy insights
  
  const topCandidatesCount = Math.min(rankedCandidates.length, 5);
  const averageScore = rankedCandidates.slice(0, topCandidatesCount)
    .reduce((sum, c) => sum + c.matchScore, 0) / topCandidatesCount || 0;
  
  const skillsBreakdown: Record<string, number> = {};
  
  rankedCandidates.slice(0, topCandidatesCount).forEach(candidate => {
    if (candidate.matchDetails?.matchedRequiredSkills) {
      candidate.matchDetails.matchedRequiredSkills.forEach((skill: string) => {
        skillsBreakdown[skill] = (skillsBreakdown[skill] || 0) + 1;
      });
    }
  });
  
  return {
    topCandidatesAverageScore: Math.round(averageScore),
    mostCommonSkills: Object.entries(skillsBreakdown)
      .map(([skill, count]) => ({ skill, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3)
      .map(item => item.skill),
    candidatePoolQuality: averageScore > 85 ? 'Excellent' : 
      averageScore > 70 ? 'Good' : 
      averageScore > 50 ? 'Fair' : 'Poor',
    mostMissingSkills: getMostMissingSkills(rankedCandidates),
    recommendedInterviewQuestions: generateInterviewQuestions(params.requiredSkills || [])
  };
}

// Find skills that are most commonly missing from candidates
function getMostMissingSkills(candidates: any[]): string[] {
  const missingSkillsCount: Record<string, number> = {};
  
  candidates.forEach(candidate => {
    if (candidate.matchDetails?.missingSkills) {
      candidate.matchDetails.missingSkills.forEach((skill: string) => {
        missingSkillsCount[skill] = (missingSkillsCount[skill] || 0) + 1;
      });
    }
  });
  
  return Object.entries(missingSkillsCount)
    .map(([skill, count]) => ({ skill, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3)
    .map(item => item.skill);
}

// Generate interview questions based on required skills
function generateInterviewQuestions(skills: string[]): string[] {
  // In a real system, this would use an LLM to generate questions
  // Here we'll use a simple template-based approach
  const questions: string[] = [];
  
  skills.slice(0, 3).forEach(skill => {
    questions.push(`Can you describe a project where you used ${skill}?`);
    questions.push(`What challenges have you faced when working with ${skill}?`);
  });
  
  // Add some general questions
  questions.push("How do you approach learning new technologies?");
  questions.push("Describe a situation where you had to work under pressure to meet a deadline.");
  
  return questions.slice(0, 5); // Return up to 5 questions
}

// Generate next steps based on matching results
function generateNextSteps(hasResults: boolean, params: TalentMatchingTaskParams): string[] {
  if (!hasResults) {
    return [
      "Broaden your job requirements to find more candidates",
      "Consider candidates with adjacent skills who can be trained",
      "Look at different geographical locations or remote options"
    ];
  }
  
  return [
    "Review the top 3 candidates in detail",
    "Schedule interviews with candidates who scored above 80%",
    "Prepare customized interview questions based on each candidate's profile",
    "Consider technical assessments to validate skill proficiency"
  ];
}
