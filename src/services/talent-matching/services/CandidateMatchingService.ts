
import { MatchingOptions, MatchingResult } from "@/components/talent-matching/types";
import { generateDummyInsights } from "@/hooks/talent-matching/matching-utils";
import { ProcessedJobDescription } from "./JobProcessingService";

export const generateCandidateResults = async (
  jobDetails: ProcessedJobDescription,
  matchingOptions: MatchingOptions
): Promise<MatchingResult> => {
  const targetSources = matchingOptions.targetSources || ["Internal Database"];
  const candidatesPerSource = 3;
  const candidates = [];
  
  for (const source of targetSources) {
    const sourceCandidates = Array.from({ length: candidatesPerSource }, (_, i) => {
      const matchScore = Math.floor(Math.random() * 25) + 75;
      const skillMatchScore = Math.floor(Math.random() * 30) + 70;
      const experienceMatchScore = Math.floor(Math.random() * 40) + 60;
      const candidateIndex = candidates.length + 1;
      
      return {
        id: `candidate-${source.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
        name: `Candidate ${candidateIndex}`,
        title: `Senior ${jobDetails.extractedSkills?.[i % (jobDetails.extractedSkills?.length || 1)] || 'Developer'}`,
        location: ['Remote', 'New York', 'San Francisco', 'Austin', 'London'][i % 5],
        experience: jobDetails.suggestedExperience + Math.floor(Math.random() * 5) - 2,
        skills: [
          ...(jobDetails.extractedSkills || []).slice(0, Math.floor(Math.random() * 4) + 3),
          'Communication',
          'Teamwork',
          i % 3 === 0 ? 'Leadership' : 'Problem Solving'
        ],
        salary: (90000 + candidateIndex * 10000 + Math.floor(Math.random() * 20000)),
        availability: ['Immediate', '2 weeks', '1 month', 'Negotiable'][i % 4],
        source,
        matchScore,
        skillMatchScore,
        experienceMatchScore,
        educationMatchScore: Math.floor(Math.random() * 40) + 60,
        contactInfo: {
          email: `candidate${candidateIndex}@example.com`,
          phone: `(555) ${100 + candidateIndex}-${1000 + candidateIndex}`
        },
        avatar: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${(candidateIndex % 70) + 1}.jpg`
      };
    });
    
    candidates.push(...sourceCandidates);
  }
  
  const sortedCandidates = [...candidates].sort((a, b) => b.matchScore - a.matchScore);
  
  const insights = generateDummyInsights(targetSources);
  
  return {
    candidates: sortedCandidates,
    jobTitle: jobDetails.extractedTitle || '',
    extractedSkills: jobDetails.extractedSkills,
    suggestedExperience: jobDetails.suggestedExperience,
    keyResponsibilities: jobDetails.keyResponsibilities,
    matchingModelUsed: matchingOptions.matchingModel,
    totalCandidatesScanned: 150 + (targetSources.length * 50) + Math.floor(Math.random() * 300),
    matchTime: 2.5 + Math.random() * 1.5,
    sourcesUsed: targetSources,
    candidatesPerSource: targetSources.reduce((acc, source) => {
      acc[source] = candidates.filter(c => c.source === source).length;
      return acc;
    }, {} as Record<string, number>),
    insights,
    crossSourceValidation: {
      sourcesSearched: targetSources,
      candidatesFound: sortedCandidates.length + 5,
      verifiedCandidates: Math.floor(sortedCandidates.length / 2),
      verificationRate: 0.42,
      averageCrossSourceScore: 0.78
    }
  };
};
