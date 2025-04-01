
import { MatchingInsights, TalentMatchingTaskParams } from '../types/TalentMatchingTypes';

// Generate insights about the matching results
export function generateMatchingInsights(rankedCandidates: any[], params: TalentMatchingTaskParams): MatchingInsights {
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
export function getMostMissingSkills(candidates: any[]): string[] {
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
export function generateInterviewQuestions(skills: string[]): string[] {
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
