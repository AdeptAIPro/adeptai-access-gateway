
import { useState } from 'react';
import { MatchingInsightsData } from '@/components/talent-matching/types';

// Extract skills from job description
export const extractSkillsFromJobDescription = (jobDescription: string): string[] => {
  // This is a simplified implementation for demo purposes
  // In a real application, you would use NLP to extract skills
  const commonSkills = [
    "JavaScript", "TypeScript", "React", "Angular", "Vue", "Node.js",
    "Python", "Java", "C#", "SQL", "MongoDB", "AWS", "Docker",
    "Project Management", "Agile", "Communication", "Leadership"
  ];
  
  // Check which skills are mentioned in the job description
  return commonSkills.filter(skill => 
    jobDescription.toLowerCase().includes(skill.toLowerCase())
  );
};

// Generate dummy insights for the matching results
export const generateDummyInsights = (sources: string[]): MatchingInsightsData => {
  return {
    talentPoolQuality: Math.random() > 0.5 ? "Excellent" : "Good",
    competitivePositioning: {
      talentAvailability: Math.random() > 0.5 ? "High" : "Medium",
      competitiveness: Math.random() > 0.5 ? "Highly Competitive" : "Moderately Competitive",
      salaryRange: {
        min: 80000,
        max: 120000,
        median: 95000
      },
      timeToHire: Math.random() > 0.5 ? "2-3 weeks" : "4-6 weeks"
    },
    recommendedSourcingStrategy: {
      mostEffectiveSources: sources.slice(0, 2),
      suggestedOutreachOrder: sources,
      untappedSources: ["GitHub", "Stack Overflow", "Tech Meetups"],
      recommendedSources: ["LinkedIn", "Indeed"]
    }
  };
};

// Save recent search to user's history
export const saveRecentSearch = async (user: any, jobDescription: string) => {
  if (!user) return;
  
  try {
    // This would typically be saved to a database
    console.log(`Saving search for user ${user.id}: ${jobDescription.substring(0, 50)}...`);
    
    // In a real application, you would make an API call here
    const mockResponse = { success: true };
    return mockResponse;
  } catch (error) {
    console.error("Error saving recent search:", error);
    return { success: false, error: "Failed to save search" };
  }
};
