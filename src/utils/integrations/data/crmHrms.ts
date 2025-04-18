
import { IntegrationItem } from "@/types/integration";
import { getIconForIntegration } from "../icons";

export const createCrmHrmsList = (): IntegrationItem[] => {
  return ["Salesforce", "HubSpot", "Zoho CRM", "Oracle HCM", "SAP SuccessFactors", "Bullhorn", "ADP"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `Connect to ${name} CRM/HRMS`,
      icon: getIconForIntegration(name),
      category: "CRM & HRMS",
      connected: Math.random() > 0.8,
    }));
};
