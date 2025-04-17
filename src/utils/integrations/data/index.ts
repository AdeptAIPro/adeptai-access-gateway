
import { createVmsSystemsList } from "./vmsSystems";
import { createAtsList } from "./ats";
import { createPaidJobBoardsList, createFreeJobPostingList } from "./jobBoards";
import { createSocialList } from "./social";
import { createProductivityList } from "./productivity";
import { createComplianceBoardsList } from "./compliance";
import { createBackgroundBoardsList } from "./background";
import { createOnboardingBoardsList } from "./onboarding";
import { createCrmHrmsList } from "./crmHrms";
import { IntegrationItem } from "@/types/integration";

// Export all individual category creation functions
export {
  createVmsSystemsList,
  createAtsList,
  createPaidJobBoardsList,
  createFreeJobPostingList,
  createSocialList,
  createProductivityList,
  createComplianceBoardsList,
  createBackgroundBoardsList,
  createOnboardingBoardsList,
  createCrmHrmsList
};

// Main function to create the full integrations list
export const createIntegrationsList = (): IntegrationItem[] => {
  return [
    ...createVmsSystemsList(),
    ...createAtsList(),
    ...createPaidJobBoardsList(),
    ...createFreeJobPostingList(),
    ...createSocialList(),
    ...createProductivityList(),
    ...createComplianceBoardsList(),
    ...createBackgroundBoardsList(),
    ...createOnboardingBoardsList(),
    ...createCrmHrmsList()
  ];
};
