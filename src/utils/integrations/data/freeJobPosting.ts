
import { Integration } from './categories';

export function createFreeJobPostingList(): Integration[] {
  return [
    {
      id: 'google-jobs',
      name: 'Google Jobs',
      description: 'Post jobs to Google Jobs',
      status: 'active',
      popular: true,
      logoUrl: '/img/integrations/google.svg'
    },
    {
      id: 'glassdoor',
      name: 'Glassdoor',
      description: 'Post jobs to Glassdoor',
      status: 'coming_soon',
      logoUrl: '/img/integrations/glassdoor.svg'
    },
    {
      id: 'careerjunction',
      name: 'CareerJunction',
      description: 'Post jobs to CareerJunction',
      status: 'coming_soon',
      logoUrl: '/img/integrations/careerjunction.svg'
    }
  ];
}
