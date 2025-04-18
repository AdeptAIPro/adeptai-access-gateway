
import { Integration } from './categories';

export function createOnboardingBoardsList(): Integration[] {
  return [
    {
      id: 'bamboohr',
      name: 'BambooHR',
      description: 'HR software for small and medium businesses',
      status: 'active',
      popular: true,
      logoUrl: '/img/integrations/bamboohr.svg'
    },
    {
      id: 'workday-onboarding',
      name: 'Workday Onboarding',
      description: 'Enterprise onboarding solutions',
      status: 'coming_soon',
      logoUrl: '/img/integrations/workday.svg'
    },
    {
      id: 'clickboarding',
      name: 'Click Boarding',
      description: 'Modern onboarding platform',
      status: 'coming_soon',
      logoUrl: '/img/integrations/clickboarding.svg'
    }
  ];
}
