
import { Integration } from './categories';

export function createBackgroundBoardsList(): Integration[] {
  return [
    {
      id: 'hireright',
      name: 'HireRight',
      description: 'Background screening',
      status: 'active',
      logoUrl: '/img/integrations/hireright.svg'
    },
    {
      id: 'sterling',
      name: 'Sterling',
      description: 'Background verification',
      status: 'coming_soon',
      logoUrl: '/img/integrations/sterling.svg'
    },
    {
      id: 'goodhire',
      name: 'GoodHire',
      description: 'Background checks',
      status: 'coming_soon',
      logoUrl: '/img/integrations/goodhire.svg'
    }
  ];
}
