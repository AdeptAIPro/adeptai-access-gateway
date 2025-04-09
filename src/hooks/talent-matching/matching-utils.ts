
import { MatchingInsightsData } from "@/components/talent-matching/types";
import { supabase } from "@/lib/supabase";

/**
 * Simple function to extract skills from job description
 */
export const extractSkillsFromJobDescription = (text: string): string[] => {
  const commonSkills = [
    "JavaScript", "TypeScript", "React", "Angular", "Vue", "Node.js",
    "Python", "Java", "C#", "Ruby", "PHP", "Go", "Rust", "Swift",
    "SQL", "MongoDB", "PostgreSQL", "MySQL", "AWS", "Azure", "GCP",
    "Docker", "Kubernetes", "CI/CD", "DevOps", "Machine Learning",
    "Data Science", "AI", "Project Management", "Agile", "Scrum"
  ];
  
  // Return skills that are mentioned in the text
  return commonSkills.filter(skill => 
    text.toLowerCase().includes(skill.toLowerCase())
  ).slice(0, 10); // Limit to 10 skills
};

/**
 * Generate dummy insights for the matching results
 */
export const generateDummyInsights = (sources: string[]): MatchingInsightsData => {
  return {
    talentPoolQuality: "Good",
    crossSourceStatistics: {
      totalCandidates: 150 + sources.length * 30,
      verifiedCandidates: 50 + sources.length * 10,
      verifiedPercentage: Math.round((50 + sources.length * 10) / (150 + sources.length * 30) * 100),
      averageCrossSourceScore: 0.78
    },
    recommendedSourcingStrategy: {
      mostEffectiveSources: sources.slice(0, 2),
      recommendedSources: [...sources, "GitHub", "AngelList"],
      suggestedOutreachOrder: ["Internal Database", "LinkedIn", "Indeed"],
      untappedSources: ["Stack Overflow", "Hired"]
    },
    competitivePositioning: {
      talentAvailability: "Medium",
      competitiveness: "High",
      salaryRange: {
        min: 80000,
        max: 140000,
        median: 110000
      },
      timeToHire: "2-4 weeks"
    }
  };
};

/**
 * Save recent search to Supabase
 */
export const saveRecentSearch = async (user: any, searchText: string) => {
  if (!user) return;
  
  try {
    await supabase
      .from('recent_searches')
      .insert([
        { 
          user_id: user.id, 
          search_text: searchText.substring(0, 500),
          search_type: 'job_description' 
        }
      ]);
  } catch (err) {
    console.error('Failed to save recent search:', err);
  }
};
