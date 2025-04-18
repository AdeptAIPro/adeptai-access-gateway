
import { Integration } from './categories';

export function createCrmHrmsList(): Integration[] {
  return [
    {
      id: 'salesforce',
      name: 'Salesforce',
      description: 'Connect with Salesforce CRM',
      status: 'active',
      popular: true,
      logoUrl: '/img/integrations/salesforce.svg'
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      description: 'Connect with HubSpot CRM',
      status: 'active',
      logoUrl: '/img/integrations/hubspot.svg'
    },
    {
      id: 'workday-hrms',
      name: 'Workday HRMS',
      description: 'Connect with Workday HRMS',
      status: 'coming_soon',
      logoUrl: '/img/integrations/workday.svg'
    }
  ];
}
