
import { IntegrationItem } from "@/types/integration";
import { getIconForIntegration } from "../icons";

export const createOnboardingBoardsList = (): IntegrationItem[] => {
  return ["BambooHR", "Workday Onboarding", "Gusto", "Rippling", "Zenefits Onboarding", "Paylocity"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `Streamline onboarding with ${name}`,
      icon: getIconForIntegration(name),
      category: "Onboarding Boards",
      connected: Math.random() > 0.8,
    }));
};
