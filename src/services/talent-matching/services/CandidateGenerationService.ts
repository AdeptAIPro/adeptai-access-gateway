
import { Candidate, MatchingOptions } from "@/components/talent-matching/types";

/**
 * Generates candidate profile data for each source
 */
export const generateCandidateProfiles = (
  candidatesPerSource: number,
  sources: string[],
  suggestedExperience: number,
  extractedSkills?: string[]
): Candidate[] => {
  const candidates: Candidate[] = [];
  
  for (const source of sources) {
    const sourceCandidates = Array.from({ length: candidatesPerSource }, (_, i) => {
      const matchScore = Math.floor(Math.random() * 25) + 75;
      const skillMatchScore = Math.floor(Math.random() * 30) + 70;
      const experienceMatchScore = Math.floor(Math.random() * 40) + 60;
      const candidateIndex = candidates.length + 1;
      
      return {
        id: `candidate-${source.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
        name: `Candidate ${candidateIndex}`,
        title: `Senior ${extractedSkills?.[i % (extractedSkills?.length || 1)] || 'Developer'}`,
        location: ['Remote', 'New York', 'San Francisco', 'Austin', 'London'][i % 5],
        experience: suggestedExperience + Math.floor(Math.random() * 5) - 2,
        skills: [
          ...(extractedSkills || []).slice(0, Math.floor(Math.random() * 4) + 3),
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
        education: ['Bachelor in Computer Science', 'Master in Data Science', 'PhD in AI', 'Self-taught'][i % 4],
        avatar: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${(candidateIndex % 70) + 1}.jpg`
      };
    });
    
    candidates.push(...sourceCandidates);
  }
  
  return candidates;
};
