
import { faker } from '@faker-js/faker';
import { Candidate, MatchingResult, MatchingInsightsData } from '@/components/talent-matching/types';

// Generate fallback insights data
export const generateFallbackInsights = (useCrossSource = false): MatchingInsightsData => {
  return {
    talentPoolQuality: faker.helpers.arrayElement(['Excellent', 'Good', 'Average', 'Below Average']),
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
      mostEffectiveSources: [
        'LinkedIn',
        'Internal Database',
        'Employee Referrals'
      ],
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
    crossSourceStatistics: useCrossSource ? {
      sourcesAnalyzed: 5,
      profilesMatched: 28,
      averageMatchConfidence: 0.76
    } : undefined
  };
};

// Generate fallback candidates for demo
export const generateFallbackCandidates = (count = 10): Candidate[] => {
  const candidates: Candidate[] = [];
  
  for (let i = 0; i < count; i++) {
    const isCrossVerified = Math.random() > 0.6;
    const occurrences = isCrossVerified ? Math.floor(Math.random() * 3) + 1 : 0;
    
    candidates.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      title: faker.person.jobTitle(),
      location: `${faker.location.city()}, ${faker.location.state()}`,
      skills: Array(5).fill(0).map(() => 
        faker.helpers.arrayElement([
          'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python',
          'Java', 'C#', 'AWS', 'Docker', 'Kubernetes', 'GraphQL',
          'PostgreSQL', 'MongoDB', 'Agile', 'Scrum', 'Project Management'
        ])
      ),
      experience: Math.floor(Math.random() * 10) + 1,
      education: faker.helpers.arrayElement([
        "Bachelor's in Computer Science",
        "Master's in Software Engineering",
        "Bachelor's in Information Technology",
        "Master's in Computer Engineering",
        "PhD in Computer Science"
      ]),
      matchScore: Math.floor(Math.random() * 30) + 70,
      source: faker.helpers.arrayElement([
        'LinkedIn', 'Indeed', 'Internal Database', 'GitHub', 'Referral'
      ]),
      crossSourceVerified: isCrossVerified,
      crossSourceOccurrences: occurrences,
      crossSourceSources: isCrossVerified ? 
        faker.helpers.arrayElements(['LinkedIn', 'GitHub', 'Indeed', 'StackOverflow', 'Dice'], occurrences) : 
        undefined,
      crossSourceScore: isCrossVerified ? 0.5 + (Math.random() * 0.5) : undefined,
      complianceVerified: Math.random() > 0.7,
      culturalFitScore: Math.random() * 100,
    });
  }
  
  return candidates;
};

// Generate a fallback matching result
export const generateFallbackMatchingResult = (
  jobTitle: string, 
  extractedSkills: string[],
  useCrossSource = false
): MatchingResult => {
  return {
    jobTitle,
    extractedSkills,
    candidates: generateFallbackCandidates(Math.floor(Math.random() * 10) + 5),
    suggestedExperience: Math.floor(Math.random() * 5) + 2,
    totalCandidatesScanned: Math.floor(Math.random() * 500) + 100,
    matchTime: (Math.random() * 3) + 1,
    matchingModelUsed: useCrossSource ? 'cross-source' : 'standard',
    keyResponsibilities: [
      'Develop and maintain software applications',
      'Collaborate with cross-functional teams',
      'Implement best practices and coding standards',
      'Debug and resolve technical issues'
    ],
    insights: generateFallbackInsights(useCrossSource),
    crossSourceValidation: useCrossSource ? {
      sourcesSearched: ['LinkedIn', 'GitHub', 'Indeed', 'Internal Database'],
      candidatesFound: Math.floor(Math.random() * 50) + 20,
      verifiedCandidates: Math.floor(Math.random() * 20) + 5,
      verificationRate: (Math.random() * 0.3) + 0.4,
      averageCrossSourceScore: (Math.random() * 0.2) + 0.7
    } : undefined
  };
};
