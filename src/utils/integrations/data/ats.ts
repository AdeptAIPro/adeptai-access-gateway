
import { Integration } from './categories';

export function createAtsList(): Integration[] {
  return [
    {
      id: 'greenhouse',
      name: 'Greenhouse',
      description: 'Connect with Greenhouse ATS',
      status: 'active',
      popular: true,
      logoUrl: '/img/integrations/greenhouse.svg'
    },
    {
      id: 'lever',
      name: 'Lever',
      description: 'Connect with Lever ATS',
      status: 'active',
      logoUrl: '/img/integrations/lever.svg'
    },
    {
      id: 'jobvite',
      name: 'Jobvite',
      description: 'Connect with Jobvite ATS',
      status: 'coming_soon',
      logoUrl: '/img/integrations/jobvite.svg'
    }
  ];
}
