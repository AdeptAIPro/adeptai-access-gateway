
import { IntegrationItem } from "@/types/integration";
import { getIconForIntegration } from "../icons";

export const createVmsSystemsList = (): IntegrationItem[] => {
  return ["VMS System 1", "VMS System 2", "VMS System 3", "VMS System 4", "VMS System 5"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `Connect to ${name}`,
      icon: getIconForIntegration(name),
      category: "VMS Systems",
      connected: Math.random() > 0.8,
    }));
};
