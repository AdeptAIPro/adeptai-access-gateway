
import { IntegrationItem } from "@/types/integration";
import { getIconForIntegration } from "../icons";

export const createComplianceBoardsList = (): IntegrationItem[] => {
  return ["E-Verify", "I-9 Compliance", "OFCCP Compliance", "ADA Compliance", "EEO Compliance", "Wage & Hour Compliance"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `${name} compliance tools and verification`,
      icon: getIconForIntegration(name),
      category: "Compliance Boards",
      connected: Math.random() > 0.8,
    }));
};
