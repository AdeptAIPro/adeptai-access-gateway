
import { Candidate, MatchingOptions, MatchingResult, MatchingModel } from "@/components/talent-matching/types";

/**
 * Provides fallback matching results when the database is unavailable
 */
export const getFallbackMatchingResult = (options: MatchingOptions): MatchingResult => {
  // This is the original mock implementation for fallback
  const matchedCandidates: Candidate[] = [
    {
      id: "1",
      name: "Emily Johnson",
      title: "Senior Software Engineer",
      location: "San Francisco, CA",
      education: "Stanford University",
      experience: 8,
      skills: ["JavaScript", "React", "Node.js", "Python", "AWS"],
      matchScore: options.useSemanticMatching ? 94 : 92,
      source: "LinkedIn",
      avatar: "https://github.com/shadcn.png",
      culturalFitScore: 89,
      complianceVerified: true,
      certifications: ["AWS Solutions Architect", "Scrum Master"],
      implicitCompetencies: ["Problem Solving", "Team Leadership", "System Design"],
      historicalSuccessRate: 0.92
    },
    {
      id: "2",
      name: "Michael Chen",
      title: "Full Stack Developer",
      location: "New York, NY",
      education: "MIT",
      experience: 6,
      skills: ["TypeScript", "React", "MongoDB", "Express", "Docker"],
      matchScore: options.useSemanticMatching ? 91 : 87,
      source: "Ceipal",
      avatar: "https://github.com/shadcn.png",
      culturalFitScore: 85,
      complianceVerified: options.useComplianceVerification,
      certifications: ["MongoDB Developer", "Docker Certified Associate"],
      implicitCompetencies: ["Code Quality", "Technical Documentation", "Mentoring"],
      historicalSuccessRate: 0.88
    },
    {
      id: "3",
      name: "Sarah Williams",
      title: "Frontend Developer",
      location: "Austin, TX",
      education: "UT Austin",
      experience: 5,
      skills: ["JavaScript", "React", "CSS", "HTML", "Redux"],
      matchScore: options.useRAG ? 88 : 85,
      source: "JobDiva",
      avatar: "https://github.com/shadcn.png",
      culturalFitScore: 92,
      complianceVerified: true,
      certifications: ["React Certified Developer"],
      implicitCompetencies: ["UI/UX Sensibility", "User Advocacy", "Accessibility"],
      historicalSuccessRate: 0.90
    },
    {
      id: "4",
      name: "James Garcia",
      title: "Backend Engineer",
      location: "Seattle, WA",
      education: "University of Washington",
      experience: 7,
      skills: ["Java", "Spring Boot", "Python", "PostgreSQL", "Kafka"],
      matchScore: options.useSkillBasedFiltering ? 86 : 82,
      source: "LinkedIn",
      avatar: "https://github.com/shadcn.png",
      culturalFitScore: 78,
      complianceVerified: options.useComplianceVerification,
      certifications: ["Oracle Certified Professional", "Kafka Developer"],
      implicitCompetencies: ["Distributed Systems", "Performance Optimization", "Scalability"],
      historicalSuccessRate: 0.85
    },
    {
      id: "5",
      name: "Olivia Martinez",
      title: "DevOps Engineer",
      location: "Chicago, IL",
      education: "University of Illinois",
      experience: 6,
      skills: ["Kubernetes", "Docker", "Terraform", "AWS", "Jenkins"],
      matchScore: options.useRAG ? 83 : 78,
      source: "Stafferlink",
      avatar: "https://github.com/shadcn.png",
      culturalFitScore: 81,
      complianceVerified: true,
      certifications: ["Kubernetes Administrator", "AWS DevOps Professional"],
      implicitCompetencies: ["Infrastructure Automation", "CI/CD Pipeline Design", "Security Best Practices"],
      historicalSuccessRate: 0.87
    }
  ];
  
  return {
    candidates: matchedCandidates,
    matchingModelUsed: options.matchingModel,
    matchingTime: 2.7 // seconds
  };
};

/**
 * Provides fallback matching models when database is unavailable
 */
export const getFallbackMatchingModels = (): MatchingModel[] => {
  return [
    {
      id: "openai-ada-002",
      name: "OpenAI Ada 002",
      type: "openai",
      description: "OpenAI's text-embedding model for semantic matching"
    },
    {
      id: "tensorflow-bert",
      name: "TensorFlow BERT",
      type: "tensorflow",
      description: "Custom BERT model trained on industry-specific data"
    },
    {
      id: "pytorch-roberta",
      name: "PyTorch RoBERTa",
      type: "pytorch", 
      description: "Fine-tuned RoBERTa model for technical skill extraction"
    },
    {
      id: "hybrid-rag",
      name: "Hybrid RAG",
      type: "hybrid",
      description: "Retrieval-Augmented Generation model combining vector search and LLM"
    }
  ];
};
