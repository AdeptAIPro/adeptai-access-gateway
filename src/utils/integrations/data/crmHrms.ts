
import { IntegrationItem } from "@/types/integration";
import { getIconForIntegration } from "../icons";

export const createCrmHrmsList = (): IntegrationItem[] => {
  return ["Salesforce", "HubSpot", "Microsoft Dynamics", "Zoho CRM", "Oracle HCM", "SAP SuccessFactors"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `Connect to ${name} for talent data`,
      icon: getIconForIntegration(name),
      category: "CRM & HRMS",
      connected: Math.random() > 0.8,
    }));
};
