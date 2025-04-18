
import { Integration } from './categories';

export function createComplianceBoardsList(): Integration[] {
  return [
    {
      id: 'verified-credentials',
      name: 'Verified Credentials',
      description: 'Verify candidate credentials',
      status: 'active',
      logoUrl: '/img/integrations/verified.svg'
    },
    {
      id: 'checkr',
      name: 'Checkr',
      description: 'Background checks',
      status: 'coming_soon',
      logoUrl: '/img/integrations/checkr.svg'
    },
    {
      id: 'nursys',
      name: 'Nursys',
      description: 'Nurse verification system',
      status: 'coming_soon',
      logoUrl: '/img/integrations/nursys.svg'
    }
  ];
}
