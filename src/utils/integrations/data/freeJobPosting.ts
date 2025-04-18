
import { IntegrationItem } from "@/types/integration";
import { getIconForIntegration } from "../icons";

export const createFreeJobPostingList = (): IntegrationItem[] => {
  return ["Indeed (Free)", "Google for Jobs", "Jora", "Jooble", "Adzuna", "Trovit", "JobInventory"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `Post jobs to ${name} for free`,
      icon: getIconForIntegration(name),
      category: "Free Job Posting",
      connected: Math.random() > 0.8,
    }));
};
