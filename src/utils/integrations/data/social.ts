
import { IntegrationItem } from "@/types/integration";
import { getIconForIntegration } from "../icons";

export const createSocialList = (): IntegrationItem[] => {
  return ["LinkedIn", "Twitter", "Facebook", "Instagram", "YouTube", "TikTok", "Reddit"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-') + "-social",
      name,
      description: `Connect your ${name} social media account`,
      icon: getIconForIntegration(name),
      category: "Social",
      connected: Math.random() > 0.8,
    }));
};
