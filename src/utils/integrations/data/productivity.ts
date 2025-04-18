
import { IntegrationItem } from "@/types/integration";
import { getIconForIntegration } from "../icons";

export const createProductivityList = (): IntegrationItem[] => {
  return ["Slack", "Microsoft Teams", "Google Workspace", "Asana", "Trello", "Monday.com", "ClickUp"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `Connect to ${name} for team productivity`,
      icon: getIconForIntegration(name),
      category: "Productivity",
      connected: Math.random() > 0.8,
    }));
};
