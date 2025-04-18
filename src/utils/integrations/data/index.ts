
import { Icon } from 'lucide-react';

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
