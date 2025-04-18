
import { IntegrationItem } from "@/types/integration";
import { getIconForIntegration } from "../icons";

export const createBackgroundBoardsList = (): IntegrationItem[] => {
  return ["HireRight", "Sterling", "Checkr", "GoodHire", "Accurate", "Certn", "Cisive"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `${name} background verification`,
      icon: getIconForIntegration(name),
      category: "Background Boards",
      connected: Math.random() > 0.8,
    }));
};
