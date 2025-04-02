
import { CrossSourceCandidate } from '../types/CrossSourceTypes';
import { CandidateWithMatchDetails } from '../types/TalentMatchingTypes';

// Score and rank candidates based on job requirements
export function rankCandidates(
  candidates: CrossSourceCandidate[],
  requiredSkills: string[],
  preferredSkills: string[],
  prioritizeCulturalFit: boolean,
  jobAnalysis: any
): CrossSourceCandidate[] {
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
    
    // Extract experience value - properly handle string experience format
    let experienceValue = 0;
    if (typeof candidate.experience === 'string') {
      const experienceMatch = candidate.experience.match(/(\d+)/);
      if (experienceMatch && experienceMatch[1]) {
        experienceValue = parseInt(experienceMatch[1], 10);
      }
    }
    
    // Calculate experience match 
    const experienceScore = experienceValue >= (jobAnalysis.suggestedExperience || 0) ? 1 : 
      (experienceValue / (jobAnalysis.suggestedExperience || 1));
    
    // Calculate cultural fit score (placeholder - in real system this would be more sophisticated)
    // This could use ML models trained on successful hires
    const culturalFitScore = candidate.culturalFitScore || Math.random() * 0.5 + 0.5; // Random score between 0.5-1
    
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
