
import { CrossSourceCandidate } from "../types/CrossSourceTypes";
import { OutreachStrategy } from "../types/CrossSourceTypes";

/**
 * Generate outreach strategies for candidates based on their profile
 */
export const generateOutreachStrategies = (
  candidates: CrossSourceCandidate[],
  jobTitle: string
): OutreachStrategy[] => {
  return candidates.map(candidate => {
    // Convert experience to string if it's a number
    const experienceStr = typeof candidate.experience === 'number' 
      ? `${candidate.experience} years` 
      : candidate.experience;
      
    const experienceYears = typeof candidate.experience === 'number'
      ? candidate.experience
      : parseInt(candidate.experience) || 0;
    
    return {
      candidateId: candidate.id,
      recommendedChannels: getRecommendedChannels(candidate),
      suggestedTemplates: [
        {
          type: "initial-contact",
          subject: `Opportunity for ${jobTitle} role`,
          body: `Hi ${candidate.name},\n\nI came across your profile and was impressed by your ${experienceStr} of experience. We're looking for a ${jobTitle} and I believe your skills in ${candidate.skills.slice(0, 3).join(", ")} would be a great fit.\n\nWould you be interested in discussing this opportunity?\n\nBest regards,\n[Your Name]`
        },
        {
          type: "follow-up",
          subject: `Following up: ${jobTitle} opportunity`,
          body: `Hi ${candidate.name},\n\nI wanted to follow up on my previous message about the ${jobTitle} role. Are you currently open to new opportunities?\n\nBest regards,\n[Your Name]`
        }
      ],
      bestTimesToContact: getBestTimesToContact(candidate),
      followUpStrategy: {
        timing: "3 days after initial contact",
        message: "I'm reaching out to see if you had a chance to consider the opportunity I shared."
      }
    };
  });
};

const getRecommendedChannels = (candidate: CrossSourceCandidate): string[] => {
  const channels = ["Email"];
  
  // Add LinkedIn if we have high match score
  if (candidate.matchScore > 85) {
    channels.push("LinkedIn InMail");
  }
  
  // Add phone if we have the info
  if (candidate.phone) {
    channels.push("Phone");
  }
  
  return channels;
};

const getBestTimesToContact = (candidate: CrossSourceCandidate): string[] => {
  // Default times
  return ["Tuesday morning", "Thursday afternoon"];
};
