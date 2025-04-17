
import { IntegrationItem } from "@/types/integration";
import { getIconForIntegration } from "../icons";

export const createVmsSystemsList = (): IntegrationItem[] => {
  return ["Stafferlink", "SAP Field glass", "Beeline", "IQNavigator", "PRO Unlimited VMS", "Pontoon", "KellyOCG VMS"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `Connect your ${name} VMS system`,
      icon: getIconForIntegration(name),
      category: "VMS Systems",
      connected: Math.random() > 0.8,
    }));
};
