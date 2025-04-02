
import { MatchingModel } from "@/components/talent-matching/types";
import { getAvailableMatchingModelsFromDatabase } from "./models/MatchingModelsService";

/**
 * Process job description text to extract key information
 */
export async function processJobDescription(jobDescription: string): Promise<{
  extractedTitle?: string;
  extractedSkills?: string[];
  suggestedExperience: number;
  keyResponsibilities?: string[];
}> {
  // This is a placeholder implementation - in a real app this would use
  // NLP to analyze the job description
  
  // Extract a title from the first few words
  const extractedTitle = jobDescription.split('\n')[0]?.trim() || 
    jobDescription.substring(0, 30).trim();
  
  // Extract skills based on common patterns
  const skillKeywords = [
    'React', 'JavaScript', 'TypeScript', 'Node.js', 'SQL', 'AWS', 'Python',
    'Java', 'Agile', 'Management', 'Communication', 'Leadership', 'Research',
    'Marketing', 'Finance', 'Excel', 'PowerPoint', 'Project Management',
    'Machine Learning', 'Data Analysis', 'UI/UX', 'Design', 'HTML', 'CSS'
  ];
  
  // Find skills mentioned in the job description
  const extractedSkills = skillKeywords
    .filter(skill => jobDescription.toLowerCase().includes(skill.toLowerCase()))
    .slice(0, 8); // Limit to 8 skills
  
  // Simple heuristic to estimate experience level based on keywords
  const juniorTerms = ['entry-level', 'junior', 'associate', '0-2 years', '1-3 years', 'intern', 'trainee'];
  const midTerms = ['mid-level', 'intermediate', '2-5 years', '3-5 years', 'experienced'];
  const seniorTerms = ['senior', 'lead', 'principal', '5+ years', '6+ years', '7+ years', 'manager', 'director'];
  
  let suggestedExperience = 2; // Default to mid-level
  
  // Check for experience level indicators
  if (seniorTerms.some(term => jobDescription.toLowerCase().includes(term))) {
    suggestedExperience = 5;
  } else if (midTerms.some(term => jobDescription.toLowerCase().includes(term))) {
    suggestedExperience = 3;
  } else if (juniorTerms.some(term => jobDescription.toLowerCase().includes(term))) {
    suggestedExperience = 1;
  }
  
  // Extract key responsibilities (simplified implementation)
  const keyResponsibilities = jobDescription
    .split(/\n|\./)
    .filter(line => line.trim().length > 20) // Only consider meaningful lines
    .filter(line => 
      line.toLowerCase().includes('responsible') || 
      line.toLowerCase().includes('duties') || 
      line.toLowerCase().includes('will') || 
      line.toLowerCase().includes('tasks')
    )
    .map(line => line.trim())
    .slice(0, 5); // Limit to 5 responsibilities
  
  return {
    extractedTitle,
    extractedSkills,
    suggestedExperience,
    keyResponsibilities
  };
}

/**
 * Get available AI matching models
 */
export async function getAvailableMatchingModels(): Promise<MatchingModel[]> {
  try {
    // First try to fetch from database
    const dbModels = await getAvailableMatchingModelsFromDatabase();
    
    if (dbModels && dbModels.length > 0) {
      return dbModels;
    }
    
    // If no models in database, return default models
    return [
      {
        id: "openai-ada-002",
        name: "OpenAI Ada 002",
        description: "Embeddings model for semantic search",
        complexity: "advanced",
        performance: 90,
        accuracyScore: 85,
        type: "openai"
      },
      {
        id: "tensorflow-bert",
        name: "TensorFlow BERT",
        description: "BERT model for technical role matching",
        complexity: "advanced",
        performance: 88,
        accuracyScore: 84,
        type: "tensorflow"
      },
      {
        id: "pytorch-roberta",
        name: "PyTorch RoBERTa",
        description: "Fine-tuned model for technical skills",
        complexity: "advanced",
        performance: 92,
        accuracyScore: 86,
        type: "pytorch"
      },
      {
        id: "hybrid-rag",
        name: "Hybrid RAG System",
        description: "Advanced retrieval augmented generation",
        complexity: "advanced",
        performance: 94,
        accuracyScore: 89,
        type: "hybrid"
      }
    ];
  } catch (error) {
    console.error("Error fetching matching models:", error);
    return [];
  }
}

/**
 * Match candidates with job description using specified matching options
 */
export async function matchCandidatesWithJobDescription(
  jobDescription: string,
  matchingOptions: any
): Promise<any> {
  // This is a placeholder implementation - in a real app this would use
  // AI models to match candidates with job descriptions
  
  // Extract job details
  const jobDetails = await processJobDescription(jobDescription);
  
  // Generate mock candidates for demo purposes
  const candidates = Array.from({ length: 12 }, (_, i) => {
    const matchScore = Math.floor(Math.random() * 25) + 75; // 75-99
    const skillMatchScore = Math.floor(Math.random() * 30) + 70; // 70-99
    const experienceMatchScore = Math.floor(Math.random() * 40) + 60; // 60-99
    
    return {
      id: `candidate-${i + 1}`,
      name: `Candidate ${i + 1}`,
      title: `Senior ${jobDetails.extractedSkills?.[i % jobDetails.extractedSkills.length] || 'Developer'}`,
      location: ['Remote', 'New York', 'San Francisco', 'Austin', 'London'][i % 5],
      experience: jobDetails.suggestedExperience + Math.floor(Math.random() * 5) - 2, // +/- 2 years from suggested
      skills: [
        ...(jobDetails.extractedSkills || []).slice(0, Math.floor(Math.random() * 4) + 3), // 3-6 matching skills
        'Communication',
        'Teamwork',
        i % 3 === 0 ? 'Leadership' : 'Problem Solving'
      ],
      salary: (90000 + i * 10000 + Math.floor(Math.random() * 20000)),
      availability: ['Immediate', '2 weeks', '1 month', 'Negotiable'][i % 4],
      source: ['LinkedIn', 'Indeed', 'Internal Database', 'GitHub', 'Referral'][i % 5],
      matchScore,
      skillMatchScore,
      experienceMatchScore,
      educationMatchScore: Math.floor(Math.random() * 40) + 60,
      contactInfo: {
        email: `candidate${i + 1}@example.com`,
        phone: `(555) ${100 + i}-${1000 + i}`
      }
    };
  });
  
  // Sort candidates by match score
  const sortedCandidates = [...candidates].sort((a, b) => b.matchScore - a.matchScore);
  
  return {
    candidates: sortedCandidates,
    jobTitle: jobDetails.extractedTitle,
    extractedSkills: jobDetails.extractedSkills,
    suggestedExperience: jobDetails.suggestedExperience,
    keyResponsibilities: jobDetails.keyResponsibilities,
    matchingModelUsed: matchingOptions.matchingModel,
    totalCandidatesScanned: 200 + Math.floor(Math.random() * 300),
    matchTime: 2.5 + Math.random() * 1.5
  };
}
