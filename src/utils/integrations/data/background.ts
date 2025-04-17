
import { IntegrationItem } from "@/types/integration";
import { getIconForIntegration } from "../icons";

export const createBackgroundBoardsList = (): IntegrationItem[] => {
  return ["HireRight", "Checkr", "GoodHire", "Sterling", "Accurate Background", "First Advantage", "IntelliCorp", "Verifitech", "ESR", "PreCheck"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `Perform background checks with ${name}`,
      icon: getIconForIntegration(name),
      category: "Background Boards",
      connected: Math.random() > 0.8,
    }));
};
