
import { Integration } from './categories';

export function createBackgroundBoardsList(): Integration[] {
  return [
    {
      id: 'hireright',
      name: 'HireRight',
      description: 'Comprehensive background checks',
      status: 'active',
      popular: true,
      logoUrl: '/img/integrations/hireright.svg'
    },
    {
      id: 'sterling',
      name: 'Sterling',
      description: 'Background screening services',
      status: 'coming_soon',
      logoUrl: '/img/integrations/sterling.svg'
    },
    {
      id: 'first-advantage',
      name: 'First Advantage',
      description: 'Background screening solutions',
      status: 'coming_soon',
      logoUrl: '/img/integrations/firstadvantage.svg'
    }
  ];
}
