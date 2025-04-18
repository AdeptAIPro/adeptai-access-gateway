
import { Integration } from './categories';

export function createPaidJobBoardsList(): Integration[] {
  return [
    {
      id: 'indeed',
      name: 'Indeed',
      description: 'Post jobs on Indeed',
      status: 'active',
      popular: true,
      logoUrl: '/img/integrations/indeed.svg'
    },
    {
      id: 'linkedin-jobs',
      name: 'LinkedIn Jobs',
      description: 'Post to LinkedIn Jobs',
      status: 'active',
      logoUrl: '/img/integrations/linkedin.svg'
    },
    {
      id: 'ziprecruiter',
      name: 'ZipRecruiter',
      description: 'Post to ZipRecruiter',
      status: 'coming_soon',
      logoUrl: '/img/integrations/ziprecruiter.svg'
    }
  ];
}
