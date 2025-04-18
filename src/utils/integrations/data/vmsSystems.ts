
import { Integration } from './categories';

export function createVmsSystemsList(): Integration[] {
  return [
    {
      id: 'fieldglass',
      name: 'SAP Fieldglass',
      description: 'Connect with SAP Fieldglass VMS',
      status: 'active',
      popular: true,
      logoUrl: '/img/integrations/sap.svg'
    },
    {
      id: 'beeline',
      name: 'Beeline',
      description: 'Connect with Beeline VMS',
      status: 'active',
      logoUrl: '/img/integrations/beeline.svg'
    },
    {
      id: 'pro-unlimited',
      name: 'PRO Unlimited',
      description: 'Connect with PRO Unlimited VMS',
      status: 'coming_soon',
      logoUrl: '/img/integrations/pro.svg'
    }
  ];
}
