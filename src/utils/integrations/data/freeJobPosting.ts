
import { Integration } from './categories';

export function createFreeJobPostingList(): Integration[] {
  return [
    {
      id: 'glassdoor',
      name: 'Glassdoor',
      description: 'Post jobs on Glassdoor',
      status: 'active',
      logoUrl: '/img/integrations/glassdoor.svg'
    },
    {
      id: 'google-jobs',
      name: 'Google Jobs',
      description: 'Post jobs to Google Jobs',
      status: 'active',
      logoUrl: '/img/integrations/google.svg'
    },
    {
      id: 'craigslist',
      name: 'Craigslist',
      description: 'Post jobs on Craigslist',
      status: 'coming_soon',
      logoUrl: '/img/integrations/craigslist.svg'
    }
  ];
}
