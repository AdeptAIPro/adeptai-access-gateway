
import { IntegrationItem } from "@/types/integration";
import { getIconForIntegration } from "../icons";

export const createComplianceBoardsList = (): IntegrationItem[] => {
  return ["HR360", "ADP Compliance", "ComplianceQuest", "BambooHR Compliance", "Zenefits", "Gusto Compliance"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `Ensure compliance with ${name}`,
      icon: getIconForIntegration(name),
      category: "Compliance Boards",
      connected: Math.random() > 0.8,
    }));
};
