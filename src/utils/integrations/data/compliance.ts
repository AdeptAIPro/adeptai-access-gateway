
import { IntegrationItem } from "@/types/integration";
import { getIconForIntegration } from "../icons";

export const createComplianceBoardsList = (): IntegrationItem[] => {
  return ["Compliance Tool 1", "Compliance Tool 2", "Compliance Tool 3", "Compliance Tool 4", "Compliance Tool 5"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `Connect to ${name} for compliance`,
      icon: getIconForIntegration(name),
      category: "Compliance",
      connected: Math.random() > 0.8,
    }));
};
