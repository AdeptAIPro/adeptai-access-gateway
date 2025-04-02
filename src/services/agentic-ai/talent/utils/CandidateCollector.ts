
import { CrossSourceCandidate, CrossSourceIntelligenceParams } from "../types/CrossSourceTypes";

/**
 * Collect and aggregate candidate data from multiple sources
 */
export async function collectCandidatesFromAllSources(
  params: CrossSourceIntelligenceParams
): Promise<CrossSourceCandidate[]> {
  const candidates: CrossSourceCandidate[] = [];
  
  // This would connect to multiple APIs in production
  // For now, we'll just create mock data
  
  const mockSources = params.sources || ["LinkedIn", "Ceipal", "JobDiva", "Internal Database"];
  
  // Create a few candidates that appear across multiple sources
  const crossSourceCandidates = [
    {
      id: "cs-1",
      name: "Emily Chen",
      title: "Senior Software Engineer",
      location: "San Francisco, CA",
      skills: ["React", "TypeScript", "Node.js", "AWS"],
      experience: "7 years", // Changed from number to string
      education: "M.S. Computer Science, Stanford University",
      sourcesFound: mockSources.slice(0, 3)
    },
    {
      id: "cs-2",
      name: "Michael Rodriguez",
      title: "DevOps Engineer",
      location: "Austin, TX",
      skills: ["Kubernetes", "Docker", "CI/CD", "Terraform"],
      experience: "5 years", // Changed from number to string
      education: "B.S. Computer Engineering, UT Austin",
      sourcesFound: mockSources.slice(1, 4)
    }
  ];
  
  // Add cross-source candidates with indicators that they appear in multiple sources
  crossSourceCandidates.forEach(candidate => {
    candidates.push({
      ...candidate,
      matchScore: 90 + Math.floor(Math.random() * 10),
      source: candidate.sourcesFound[0],
      crossSourceOccurrences: candidate.sourcesFound.length,
      crossSourceVerified: true,
      crossSourceSources: candidate.sourcesFound,
      email: `${candidate.name.toLowerCase().replace(' ', '.')}@example.com`,
      phone: "+1 (555) 123-4567",
      availability: "2 weeks",
      rate: "$150-175/hr"
    });
  });
  
  // Add regular candidates from each source
  mockSources.forEach(source => {
    // Add 2-3 candidates per source
    const count = 2 + Math.floor(Math.random() * 2);
    
    for (let i = 0; i < count; i++) {
      const id = `${source.toLowerCase().replace(' ', '-')}-${i+1}`;
      candidates.push({
        id,
        name: `Candidate ${id}`,
        title: ["Software Developer", "Data Engineer", "UX Designer", "Product Manager"][Math.floor(Math.random() * 4)],
        location: ["New York", "Chicago", "Seattle", "Remote"][Math.floor(Math.random() * 4)],
        skills: [
          "JavaScript", "Python", "React", "SQL", "AWS", 
          "Product Management", "UI/UX", "Data Analysis"
        ].sort(() => 0.5 - Math.random()).slice(0, 3 + Math.floor(Math.random() * 3)),
        experience: `${2 + Math.floor(Math.random() * 8)} years`, // Changed from number to string
        education: ["B.S. Computer Science", "M.S. Data Science", "B.A. Design", "MBA"][Math.floor(Math.random() * 4)],
        matchScore: 70 + Math.floor(Math.random() * 20),
        source,
        crossSourceOccurrences: 1,
        crossSourceVerified: false,
        crossSourceSources: [source],
        email: Math.random() > 0.3 ? `candidate${id}@example.com` : undefined,
        phone: Math.random() > 0.5 ? "+1 (555) 111-2222" : undefined,
        availability: Math.random() > 0.7 ? ["Immediately", "2 weeks", "1 month"][Math.floor(Math.random() * 3)] : undefined,
        rate: Math.random() > 0.6 ? ["$100-125/hr", "$125-150/hr", "$75-100/hr"][Math.floor(Math.random() * 3)] : undefined,
        bio: Math.random() > 0.8 ? "Experienced professional with a track record of success..." : undefined
      });
    }
  });
  
  return candidates;
}

/**
 * Cross-reference candidates across multiple sources to validate information
 * and provide unified candidate profiles
 */
export async function crossReferenceMultipleSourceCandidates(
  candidates: CrossSourceCandidate[]
): Promise<CrossSourceCandidate[]> {
  // In a real implementation, this would analyze candidates from different sources
  // to find matching profiles and cross-validate information
  
  // For demo purposes, we'll just pass through the candidates
  // and simulate some basic cross-referencing
  return candidates.map(candidate => {
    if (candidate.crossSourceOccurrences && candidate.crossSourceOccurrences > 1) {
      // For candidates that appear in multiple sources, add cross-source score
      return {
        ...candidate,
        crossSourceScore: Math.min(95, candidate.matchScore + 5),
        verificationStatus: 'verified' as const,
        informationConsistency: {
          score: 85 + Math.floor(Math.random() * 15),
          inconsistencies: []
        }
      };
    }
    
    // For single-source candidates, leave as is
    return candidate;
  });
}

/**
 * Calculate the average cross-source score for candidates
 */
export function calculateAverageCrossSourceScore(candidates: CrossSourceCandidate[]): number {
  if (candidates.length === 0) return 0;
  
  let totalScore = 0;
  let scoredCandidates = 0;
  
  candidates.forEach(candidate => {
    if (candidate.crossSourceVerified) {
      // Weight the score by the number of sources the candidate appears in
      const occurrences = candidate.crossSourceOccurrences || 1;
      totalScore += (candidate.matchScore * Math.min(occurrences, 3) / 3);
      scoredCandidates++;
    }
  });
  
  return scoredCandidates > 0 ? 
    Math.round(totalScore / scoredCandidates) : 0;
}
