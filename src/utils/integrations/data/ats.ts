
import { IntegrationItem } from "@/types/integration";
import { getIconForIntegration } from "../icons";

export const createAtsList = (): IntegrationItem[] => {
  return ["Ceipal", "Workday", "Taleo", "ICIMS", "Lever", "Smart Recruiters", "Bullhorn ATS", "Pinpoint", "Jobvite", "JazzHR", "Zoho Recruit"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `Integrate with ${name} applicant tracking system`,
      icon: getIconForIntegration(name),
      category: "ATS",
      connected: Math.random() > 0.8,
    }));
};
