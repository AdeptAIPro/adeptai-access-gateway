
import { IntegrationItem } from "@/types/integration";
import { getIconForIntegration } from "../icons";

export const createFreeJobPostingList = (): IntegrationItem[] => {
  return ["Jooble", "Adzuna", "Google for Jobs", "JobInventory", "Trovit", "Jobomas"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `Post jobs to ${name} for free`,
      icon: getIconForIntegration(name),
      category: "Free Job Posting",
      connected: Math.random() > 0.8,
    }));
};
