
import { faker } from '@faker-js/faker';
import { MatchingInsightsData } from '@/components/talent-matching/types';

// Extract skills from job description
export const extractSkillsFromJobDescription = (description: string): string[] => {
  // Common tech skills to extract - this would be much more sophisticated in a real app
  const commonSkills = [
    'JavaScript', 'TypeScript', 'React', 'Angular', 'Vue', 'Node.js', 
    'Python', 'Java', 'C#', 'SQL', 'NoSQL', 'MongoDB', 'PostgreSQL',
    'AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Git',
    'Agile', 'Scrum', 'Product Management', 'Project Management'
  ];
  
  // Check which skills are mentioned in the description
  const extractedSkills = commonSkills.filter(skill => 
    description.toLowerCase().includes(skill.toLowerCase())
  );
  
  // If no skills found, return some default ones
  if (extractedSkills.length === 0) {
    return ['JavaScript', 'React', 'Node.js', 'Problem Solving', 'Communication'];
  }
  
  return extractedSkills;
};

// Generate dummy insights data for demonstration
export const generateDummyInsights = (sourcesUsed: string[] = []): MatchingInsightsData => {
  return {
    talentPoolQuality: faker.helpers.arrayElement(['Excellent', 'Good', 'Average', 'Limited']),
    competitivePositioning: {
      talentAvailability: faker.helpers.arrayElement(['High', 'Moderate', 'Low']),
      competitiveness: faker.helpers.arrayElement(['High', 'Moderate', 'Low']),
      salaryRange: {
        min: 70000 + (Math.floor(Math.random() * 20) * 1000),
        max: 120000 + (Math.floor(Math.random() * 40) * 1000),
        median: 95000 + (Math.floor(Math.random() * 30) * 1000),
      },
      timeToHire: faker.helpers.arrayElement(['2-3 weeks', '3-4 weeks', '4-6 weeks']),
    },
    recommendedSourcingStrategy: {
      mostEffectiveSources: sourcesUsed.length > 0 
        ? faker.helpers.arrayElements(sourcesUsed, Math.min(3, sourcesUsed.length))
        : ['LinkedIn', 'Internal Database', 'Employee Referrals'],
      suggestedOutreachOrder: [
        'Passive candidates with 80%+ match',
        'Active job seekers with 70%+ match',
        'Suggested job board postings'
      ],
      untappedSources: [
        'Industry conferences',
        'Professional associations',
        'Alumni networks'
      ],
      recommendedSources: [
        'LinkedIn Premium',
        'GitHub',
        'StackOverflow Jobs'
      ]
    },
    crossSourceStatistics: {
      sourcesAnalyzed: sourcesUsed.length || 5,
      profilesMatched: 15 + Math.floor(Math.random() * 30),
      averageMatchConfidence: 0.7 + (Math.random() * 0.2)
    }
  };
};

// Function to save recent search
export const saveRecentSearch = async (user: any, searchTerm: string) => {
  if (!user || !searchTerm) return;
  
  try {
    // In a real app, this would save to a database
    console.log(`Saving search for user ${user.id}: ${searchTerm}`);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // In a real app, this would verify the save was successful
    return { success: true };
  } catch (error) {
    console.error('Error saving recent search:', error);
    return { success: false, error };
  }
};
