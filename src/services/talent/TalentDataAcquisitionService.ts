
import { ResumeParsingResult, ImportStats, Candidate, DataSource } from "@/components/talent-matching/types";
import { supabase } from "@/lib/supabase";

/**
 * Parses and extracts information from resume text
 * Uses a simple NLP approach to extract information
 */
export const parseResumeText = async (text: string, source: string, sourceUrl?: string): Promise<ResumeParsingResult> => {
  // In a production environment, this would use a more sophisticated NLP model
  // or an external API for parsing resumes
  
  try {
    // Simple extraction for demo purposes
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
    const phoneRegex = /(\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
    const skillsToCheck = [
      "JavaScript", "TypeScript", "React", "Angular", "Vue", "Node.js",
      "Python", "Java", "C#", "Ruby", "PHP", "Go", "Rust", "Swift",
      "SQL", "MongoDB", "PostgreSQL", "MySQL", "AWS", "Azure", "GCP",
      "Docker", "Kubernetes", "CI/CD", "DevOps", "Machine Learning",
      "Data Science", "AI", "Project Management", "Agile", "Scrum"
    ];
    
    // Extract email and phone
    const email = emailRegex.exec(text)?.[0];
    const phone = phoneRegex.exec(text)?.[0];
    
    // Extract skills by checking if they appear in the text
    const extractedSkills = skillsToCheck.filter(skill => 
      new RegExp(`\\b${skill}\\b`, 'i').test(text)
    );
    
    // Try to extract name using basic heuristics
    // In real scenarios, this would be much more sophisticated
    let name;
    const lines = text.split('\n');
    // Often the name is at the top of the resume
    if (lines.length > 0 && lines[0].trim().length > 0 && lines[0].length < 40) {
      name = lines[0].trim();
    }
    
    // Try to extract location
    // This is a very simplistic approach for demo purposes
    const commonLocations = [
      "New York", "San Francisco", "Austin", "Seattle", "Chicago", "Boston",
      "Remote", "London", "Berlin", "Paris", "Toronto", "Sydney"
    ];
    
    let location;
    for (const loc of commonLocations) {
      if (text.includes(loc)) {
        location = loc;
        break;
      }
    }
    
    // Try to infer experience (very simplistic)
    let inferredExperience;
    const yearsExp = /(\d+)[\s]*years[\s]*(of)?[\s]*experience/i.exec(text);
    if (yearsExp && yearsExp[1]) {
      inferredExperience = parseInt(yearsExp[1]);
    }
    
    return {
      originalText: text.substring(0, 5000), // Limit text size
      name,
      email,
      phone,
      extractedSkills,
      inferredExperience,
      location,
      source,
      sourceUrl,
      confidence: 0.7, // For demo purposes
    };
  } catch (error) {
    console.error("Error parsing resume text:", error);
    return {
      originalText: text.substring(0, 100) + "...", // Only store beginning in case of error
      extractedSkills: [],
      source,
      confidence: 0,
      error: "Failed to parse resume"
    };
  }
};

/**
 * Stores a parsed candidate in the database
 */
export const storeCandidateFromParsedResume = async (
  parsedResume: ResumeParsingResult
): Promise<string | null> => {
  try {
    // Check for required fields
    if (!parsedResume.extractedSkills || parsedResume.extractedSkills.length === 0) {
      throw new Error("No skills extracted from resume");
    }
    
    // Generate a candidate ID if we don't have one
    const candidateId = `candidate-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    
    // Create candidate object
    const candidate: Partial<Candidate> = {
      id: candidateId,
      name: parsedResume.name || "Unnamed Candidate",
      skills: parsedResume.extractedSkills,
      source: parsedResume.source,
      sourceUrl: parsedResume.sourceUrl,
      resumeText: parsedResume.originalText,
      experience: parsedResume.inferredExperience || 0,
      location: parsedResume.location || "Unknown",
      matchScore: 0, // Will be calculated when matching
      title: "Unknown Position", // Will need to be inferred
      profileStatus: 'active',
      enrichmentStatus: 'pending',
      lastUpdated: new Date().toISOString()
    };
    
    // If we have contact info, add it
    if (parsedResume.email || parsedResume.phone) {
      candidate.contactInfo = {
        email: parsedResume.email || "",
        phone: parsedResume.phone || ""
      };
    }
    
    // Check if we have valid Supabase connection
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseAnonKey && 
        supabaseUrl !== 'https://placeholder-supabase-url.supabase.co' && 
        supabaseAnonKey !== 'placeholder-anon-key') {
      // Save to Supabase
      const { data, error } = await supabase
        .from('candidates')
        .insert([candidate]);
        
      if (error) {
        console.error("Error storing candidate in Supabase:", error);
        return null;
      }
      
      console.log("Candidate stored in Supabase:", candidateId);
      return candidateId;
    } else {
      // For demo purposes, log the candidate
      console.log("Demo mode: Would store candidate:", candidate);
      return candidateId;
    }
  } catch (error) {
    console.error("Error storing candidate:", error);
    return null;
  }
};

/**
 * Batch imports candidates from a data source
 */
export const batchImportCandidates = async (
  candidates: ResumeParsingResult[],
  sourceName: string
): Promise<ImportStats> => {
  const stats: ImportStats = {
    totalProcessed: candidates.length,
    successfulImports: 0,
    failedImports: 0,
    duplicatesFound: 0,
    enrichmentPerformed: 0,
    startTime: new Date().toISOString(),
    endTime: "",
    sources: [sourceName]
  };
  
  for (const candidate of candidates) {
    try {
      const id = await storeCandidateFromParsedResume(candidate);
      if (id) {
        stats.successfulImports++;
      } else {
        stats.failedImports++;
      }
    } catch (error) {
      console.error("Error importing candidate:", error);
      stats.failedImports++;
    }
  }
  
  stats.endTime = new Date().toISOString();
  return stats;
};

/**
 * Gets a list of available data sources
 */
export const getDataSources = async (): Promise<DataSource[]> => {
  // In a real application, these would be stored in the database
  return [
    {
      id: "github-profiles",
      name: "GitHub Developer Profiles",
      type: "github",
      url: "https://github.com",
      status: "active",
      lastScraped: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      candidatesCount: 1250,
      description: "Developer profiles from GitHub with public repositories"
    },
    {
      id: "linkedin-public",
      name: "LinkedIn Public Profiles",
      type: "linkedin",
      url: "https://www.linkedin.com",
      status: "active",
      lastScraped: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      candidatesCount: 3750,
      description: "Public profiles from LinkedIn search results"
    },
    {
      id: "indeed-resumes",
      name: "Indeed Public Resumes",
      type: "indeed",
      url: "https://www.indeed.com",
      status: "inactive",
      candidatesCount: 850,
      description: "Resumes from Indeed's public resume database"
    },
    {
      id: "kaggle-dataset",
      name: "Kaggle Resume Dataset",
      type: "dataset",
      url: "https://www.kaggle.com/datasets/resume-dataset",
      status: "active",
      lastScraped: new Date(Date.now() - 604800000).toISOString(), // 1 week ago
      candidatesCount: 5000,
      description: "Open-source dataset of anonymized resumes"
    }
  ];
};

export const startDataSourceScraper = async (
  sourceId: string,
  options: {
    maxCandidates?: number,
    filters?: Record<string, any>
  } = {}
): Promise<boolean> => {
  // In a real application, this would trigger a background job or Lambda function
  console.log(`Started scraper for source ${sourceId} with options:`, options);
  
  // For demo purposes, return success
  return true;
};
