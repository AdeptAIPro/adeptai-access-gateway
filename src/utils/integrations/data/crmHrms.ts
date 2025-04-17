
import { IntegrationItem } from "@/types/integration";
import { getIconForIntegration } from "../icons";

export const createCrmHrmsList = (): IntegrationItem[] => {
  return ["SAP SuccessFactors", "Salesforce (CRM)", "Workday HCM", "Oracle HCM Cloud", "ADP Workforce Now", "BambooHR", "Ceridian Dayforce", "UltiPro", "Kronos Workforce Ready"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `Connect your ${name} system`,
      icon: getIconForIntegration(name),
      category: "CRM & HRMS",
      connected: Math.random() > 0.8,
    }));
};
