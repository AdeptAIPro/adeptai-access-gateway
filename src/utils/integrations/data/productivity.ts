
import { IntegrationItem } from "@/types/integration";
import { getIconForIntegration } from "../icons";

export const createProductivityList = (): IntegrationItem[] => {
  return ["Slack", "Microsoft Teams", "Jira", "Asana", "Trello", "Monday.com", "Basecamp", "Google Workplace", "Notion", "Clickup", "Zoom"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `Integrate with ${name} for better productivity`,
      icon: getIconForIntegration(name),
      category: "Productivity",
      connected: Math.random() > 0.8,
    }));
};
