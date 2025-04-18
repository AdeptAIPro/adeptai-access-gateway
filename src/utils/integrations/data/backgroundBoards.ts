
import { IntegrationItem } from "@/types/integration";
import { getIconForIntegration } from "../icons";

export const createBackgroundBoardsList = (): IntegrationItem[] => {
  return ["Sterling", "HireRight", "Checkr", "GoodHire", "Accurate Background", "First Advantage", "IntelliCorp"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `Background checks with ${name}`,
      icon: getIconForIntegration(name),
      category: "Background Boards",
      connected: Math.random() > 0.8,
    }));
};
