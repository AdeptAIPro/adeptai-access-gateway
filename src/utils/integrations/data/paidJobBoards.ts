
import { IntegrationItem } from "@/types/integration";
import { getIconForIntegration } from "../icons";

export const createPaidJobBoardsList = (): IntegrationItem[] => {
  return ["Indeed", "LinkedIn Jobs", "Monster", "ZipRecruiter", "CareerBuilder", "Dice", "SimplyHired"]
    .map(name => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description: `Post jobs to ${name}`,
      icon: getIconForIntegration(name),
      category: "Paid Job Boards",
      connected: Math.random() > 0.8,
    }));
};
