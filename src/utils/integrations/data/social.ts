
import { IntegrationItem } from "@/types/integration";
import { getIconForIntegration } from "../icons";

export const createSocialList = (): IntegrationItem[] => {
  return ["LinkedIn", "Twitter", "Facebook", "Instagram", "GitHub", "Stack Overflow", "Medium"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `Connect to ${name}`,
      icon: getIconForIntegration(name),
      category: "Social",
      connected: Math.random() > 0.8,
    }));
};
