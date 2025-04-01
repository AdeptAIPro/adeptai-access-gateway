
import { TalentMatchingTaskParams } from '../types/TalentMatchingTypes';

// Generate next steps based on matching results
export function generateNextSteps(hasResults: boolean, params: TalentMatchingTaskParams): string[] {
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
