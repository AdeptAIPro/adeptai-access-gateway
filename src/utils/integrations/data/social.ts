
import { IntegrationItem } from "@/types/integration";
import { getIconForIntegration } from "../icons";

export const createSocialList = (): IntegrationItem[] => {
  return ["LinkedIn", "Facebook", "X", "Instagram", "TikTok", "YouTube", "Business Whatsapp"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `Connect your ${name} account`,
      icon: getIconForIntegration(name),
      category: "Social",
      connected: Math.random() > 0.8,
    }));
};
