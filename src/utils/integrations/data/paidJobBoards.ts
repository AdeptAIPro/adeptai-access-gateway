
import { Integration } from './categories';

export function createPaidJobBoardsList(): Integration[] {
  return [
    {
      id: 'indeed',
      name: 'Indeed',
      description: 'Post jobs to Indeed',
      status: 'active',
      popular: true,
      logoUrl: '/img/integrations/indeed.svg'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn Jobs',
      description: 'Post jobs to LinkedIn',
      status: 'active',
      popular: true,
      logoUrl: '/img/integrations/linkedin.svg'
    },
    {
      id: 'ziprecruiter',
      name: 'ZipRecruiter',
      description: 'Post jobs to ZipRecruiter',
      status: 'coming_soon',
      logoUrl: '/img/integrations/ziprecruiter.svg'
    },
    {
      id: 'monster',
      name: 'Monster',
      description: 'Post jobs to Monster',
      status: 'coming_soon',
      logoUrl: '/img/integrations/monster.svg'
    }
  ];
}
