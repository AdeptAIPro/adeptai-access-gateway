
import { IntegrationItem } from "@/types/integration";
import { getIconForIntegration } from "../icons";

export const createVmsSystemsList = (): IntegrationItem[] => {
  return ["Fieldglass", "Beeline", "PRO Unlimited", "Wand", "Coupa", "Shiftwise", "StayStaffed"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `Connect to ${name} VMS system`,
      icon: getIconForIntegration(name),
      category: "VMS Systems",
      connected: Math.random() > 0.8,
    }));
};
