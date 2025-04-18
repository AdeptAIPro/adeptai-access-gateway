
import { IntegrationItem } from "@/types/integration";
import { getIconForIntegration } from "../icons";

export const createComplianceBoardsList = (): IntegrationItem[] => {
  return ["Nursys", "OIG Exclusions", "SAM.gov", "NPDB", "E-Verify", "I-9 Compliance", "Joint Commission"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `${name} compliance verification`,
      icon: getIconForIntegration(name),
      category: "Compliance Boards",
      connected: Math.random() > 0.8,
    }));
};
