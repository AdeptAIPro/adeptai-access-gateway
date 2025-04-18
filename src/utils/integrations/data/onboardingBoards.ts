
import { Integration } from './categories';

export function createOnboardingBoardsList(): Integration[] {
  return [
    {
      id: 'bamboohr',
      name: 'BambooHR',
      description: 'HR and onboarding platform',
      status: 'active',
      logoUrl: '/img/integrations/bamboohr.svg'
    },
    {
      id: 'workday-onboarding',
      name: 'Workday Onboarding',
      description: 'Enterprise onboarding',
      status: 'coming_soon',
      logoUrl: '/img/integrations/workday.svg'
    },
    {
      id: 'zenefits',
      name: 'Zenefits',
      description: 'HR and onboarding',
      status: 'coming_soon',
      logoUrl: '/img/integrations/zenefits.svg'
    }
  ];
}
