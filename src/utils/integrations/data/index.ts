
// Import the individual category creator functions
import { createVmsSystemsList } from './vmsSystems';
import { createAtsList } from './ats';
import { createPaidJobBoardsList } from './paidJobBoards';
import { createFreeJobPostingList } from './freeJobPosting';
import { createSocialList } from './social';
import { createProductivityList } from './productivity';
import { createComplianceBoardsList } from './complianceBoards';
import { createBackgroundBoardsList } from './backgroundBoards';
import { createOnboardingBoardsList } from './onboardingBoards';
import { createCrmHrmsList } from './crmHrms';
import { IntegrationCategory } from './categories';

// Export all the creator functions
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

// Create lists for each integration category
export const vmsSystems = createVmsSystemsList();
export const ats = createAtsList();
export const paidJobBoards = createPaidJobBoardsList();
export const freeJobPosting = createFreeJobPostingList();
export const social = createSocialList();
export const productivity = createProductivityList();
export const complianceBoards = createComplianceBoardsList();
export const backgroundBoards = createBackgroundBoardsList();
export const onboardingBoards = createOnboardingBoardsList();
export const crmHrms = createCrmHrmsList();

// Create a master list of all integration categories
export const integrationCategories: IntegrationCategory[] = [
  {
    id: 'vms',
    name: 'Vendor Management Systems',
    description: 'Connect to popular VMS platforms',
    list: vmsSystems,
  },
  {
    id: 'ats',
    name: 'Applicant Tracking Systems',
    description: 'Connect with leading ATS platforms',
    list: ats,
  },
  {
    id: 'paid-job-boards',
    name: 'Paid Job Boards',
    description: 'Post to premium job sites',
    list: paidJobBoards,
  },
  {
    id: 'free-job-posting',
    name: 'Free Job Posting Sites',
    description: 'Post to free job sites',
    list: freeJobPosting,
  },
  {
    id: 'social',
    name: 'Social Media',
    description: 'Connect with social platforms',
    list: social,
  },
  {
    id: 'productivity',
    name: 'Productivity Tools',
    description: 'Streamline your workflow',
    list: productivity,
  },
  {
    id: 'compliance',
    name: 'Compliance & Verification',
    description: 'Ensure regulatory compliance',
    list: complianceBoards,
  },
  {
    id: 'background',
    name: 'Background Check',
    description: 'Verify candidate backgrounds',
    list: backgroundBoards,
  },
  {
    id: 'onboarding',
    name: 'Onboarding Systems',
    description: 'Streamline employee onboarding',
    list: onboardingBoards,
  },
  {
    id: 'crm-hrms',
    name: 'CRM & HRMS',
    description: 'Connect with HR management systems',
    list: crmHrms,
  },
];

// Function to get all integrations in a flat array
export const getAllIntegrations = () => {
  return integrationCategories.flatMap(category => category.list);
};

// Create a combined list of all integrations
export const createIntegrationsList = () => {
  return getAllIntegrations().map(integration => ({
    ...integration,
    category: getIntegrationCategory(integration.id)?.name || 'Miscellaneous',
    connected: Math.random() > 0.75, // Random connection status for demo
    icon: getCategoryIconForIntegration(integration.id)
  }));
};

// Helper function to determine the category name for an integration
const getIntegrationCategory = (integrationId: string) => {
  for (const category of integrationCategories) {
    if (category.list.some(integration => integration.id === integrationId)) {
      return category;
    }
  }
  return null;
};

// Helper function to get icon for an integration based on its category
const getCategoryIconForIntegration = (integrationId: string) => {
  // This would normally map to actual icons
  // For now, returning a placeholder function
  return () => <div className="h-6 w-6 bg-blue-500 rounded-full"></div>;
};
