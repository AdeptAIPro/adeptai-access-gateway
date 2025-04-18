
import { IntegrationItem } from "@/types/integration";
import { getIconForIntegration } from "../icons";

export const createOnboardingBoardsList = (): IntegrationItem[] => {
  return ["BambooHR Onboarding", "Click Boarding", "WorkBright", "ClearCompany", "Zenefits", "Gusto", "Sapling", "Talmundo"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `Onboard with ${name}`,
      icon: getIconForIntegration(name),
      category: "Onboarding Boards",
      connected: Math.random() > 0.8,
    }));
};
