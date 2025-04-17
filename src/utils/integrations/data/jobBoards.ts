
import { IntegrationItem } from "@/types/integration";
import { getIconForIntegration } from "../icons";

export const createPaidJobBoardsList = (): IntegrationItem[] => {
  return ["LinkedIn Jobs", "Indeed (Paid)", "Glassdoor", "Dice (IT)", "Zip Recruiter", "CareerBuilder", "SimplyHired (Paid)", "Adzuna", "The Ladders"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `Post jobs to ${name}`,
      icon: getIconForIntegration(name.split(' ')[0]),
      category: "Paid Job Boards",
      connected: Math.random() > 0.8,
    }));
};

export const createFreeJobPostingList = (): IntegrationItem[] => {
  return ["Indeed (Free)", "SimplyHired (Free)", "Google for Jobs", "Craigslist", "Jora", "AngelList"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `Post jobs to ${name} for free`,
      icon: getIconForIntegration(name.split(' ')[0]),
      category: "Free Job Posting",
      connected: Math.random() > 0.8,
    }));
};
