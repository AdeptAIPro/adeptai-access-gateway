
import { IntegrationItem } from "@/types/integration";
import { getIconForIntegration } from "../icons";

export const createOnboardingBoardsList = (): IntegrationItem[] => {
  return ["BambooHR", "Zenefits", "Rippling", "WorkDay", "TriNet", "GoCo", "Deel"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `Onboard employees with ${name}`,
      icon: getIconForIntegration(name),
      category: "Onboarding Boards",
      connected: Math.random() > 0.8,
    }));
};
