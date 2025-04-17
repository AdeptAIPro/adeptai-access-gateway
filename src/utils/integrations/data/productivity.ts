
import { IntegrationItem } from "@/types/integration";
import { getIconForIntegration } from "../icons";

export const createProductivityList = (): IntegrationItem[] => {
  return ["Google Calendar", "Microsoft Teams", "Slack", "Trello", "Asana", "Zoom", "Microsoft Office"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `Integrate with ${name}`,
      icon: getIconForIntegration(name),
      category: "Productivity",
      connected: Math.random() > 0.8,
    }));
};
