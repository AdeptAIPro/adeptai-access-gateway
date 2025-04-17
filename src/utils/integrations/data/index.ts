
// Re-export all data functions
export { createVmsSystemsList } from './vmsSystems';
export { createAtsList } from './ats';
export { createSocialList } from './social';
export { createComplianceBoardsList } from './compliance';
export { createPaidJobBoardsList } from './paidJobBoards';
export { createFreeJobPostingList } from './freeJobPosting';
export { createProductivityList } from './productivity';
export { createBackgroundBoardsList } from './backgroundBoards';
export { createOnboardingBoardsList } from './onboardingBoards';
export { createCrmHrmsList } from './crmHrms';

// Helper function to create a complete list of all integrations
export const createIntegrationsList = () => [
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
