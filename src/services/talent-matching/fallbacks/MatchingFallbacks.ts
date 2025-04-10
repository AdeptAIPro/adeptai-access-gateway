
import { Candidate, MatchingResult } from "@/components/talent-matching/types";

export const getFallbackCandidates = (): Candidate[] => {
  return [
    {
      id: '1',
      name: 'John Doe',
      title: 'Software Engineer',
      location: 'New York',
      education: 'Masters in Computer Science',
      experience: 5,
      skills: ['JavaScript', 'React', 'Node.js'],
      matchScore: 85,
      source: 'LinkedIn',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      culturalFitScore: 90,
      complianceVerified: true,
      certifications: ['AWS Certified Developer'],
      implicitCompetencies: ['Problem-solving', 'Teamwork'],
      embeddings: [0.1, 0.2, 0.3],
      historicalSuccessRate: 0.8
    },
    {
      id: '2',
      name: 'Jane Smith',
      title: 'Data Scientist',
      location: 'San Francisco',
      education: 'PhD in Statistics',
      experience: 7,
      skills: ['Python', 'Machine Learning', 'Data Analysis'],
      matchScore: 92,
      source: 'Indeed',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      culturalFitScore: 88,
      complianceVerified: true,
      certifications: ['Certified Data Scientist'],
      implicitCompetencies: ['Critical Thinking', 'Communication'],
      embeddings: [0.4, 0.5, 0.6],
      historicalSuccessRate: 0.9
    },
    {
      id: '3',
      name: 'Alice Johnson',
      title: 'Project Manager',
      location: 'London',
      education: 'MBA',
      experience: 10,
      skills: ['Project Management', 'Leadership', 'Communication'],
      matchScore: 78,
      source: 'Glassdoor',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      culturalFitScore: 85,
      complianceVerified: false,
      certifications: ['PMP'],
      implicitCompetencies: ['Decision-making', 'Negotiation'],
      embeddings: [0.7, 0.8, 0.9],
      historicalSuccessRate: 0.75
    }
  ];
};

export const getFallbackMatchingResult = (): MatchingResult => {
  return {
    candidates: getFallbackCandidates(),
    jobTitle: 'Software Developer',
    extractedSkills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
    suggestedExperience: 3,
    keyResponsibilities: [
      'Develop web applications using React',
      'Write server-side code using Node.js',
      'Collaborate with team members on project development'
    ],
    matchingModelUsed: 'adept-matching-v2',
    totalCandidatesScanned: 247,
    matchTime: 2.3,
    insights: {
      talentPoolQuality: 'Good',
      crossSourceStatistics: {
        totalCandidates: 247,
        verifiedCandidates: 156,
        verifiedPercentage: 63,
        averageCrossSourceScore: 72
      },
      recommendedSourcingStrategy: {
        mostEffectiveSources: ['LinkedIn', 'Internal Database', 'Ceipal'],
        recommendedSources: ['LinkedIn', 'Internal Database', 'Ceipal', 'JobDiva'],
        suggestedOutreachOrder: ['LinkedIn', 'Internal Database', 'Ceipal', 'JobDiva'],
        untappedSources: ['Indeed', 'Monster']
      },
      competitivePositioning: {
        talentAvailability: 'Abundant',
        competitiveness: 'Medium',
        salaryRange: {
          min: 80000,
          max: 150000,
          median: 115000
        },
        timeToHire: '2-4 weeks'
      }
    }
  };
};
