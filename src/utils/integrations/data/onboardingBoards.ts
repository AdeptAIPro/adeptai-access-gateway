
import { IntegrationItem } from "@/types/integration";
import { getIconForIntegration } from "../icons";

export const createOnboardingBoardsList = (): IntegrationItem[] => {
  return ["Onboarding Tool 1", "Onboarding Tool 2", "Onboarding Tool 3", "Onboarding Tool 4", "Onboarding Tool 5"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `Onboard with ${name}`,
      icon: getIconForIntegration(name),
      category: "Onboarding",
      connected: Math.random() > 0.8,
    }));
};
