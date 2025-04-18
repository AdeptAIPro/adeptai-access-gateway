
import { IntegrationItem } from "@/types/integration";
import { getIconForIntegration } from "../icons";

export const createAtsList = (): IntegrationItem[] => {
  return ["Greenhouse", "Workday", "BambooHR", "Lever", "JazzHR", "Recruitee", "Workable"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `Connect to ${name} ATS`,
      icon: getIconForIntegration(name),
      category: "Applicant Tracking Systems",
      connected: Math.random() > 0.8,
    }));
};
