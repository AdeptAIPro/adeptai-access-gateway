
import { Integration } from './categories';

export function createSocialList(): Integration[] {
  return [
    {
      id: 'facebook',
      name: 'Facebook',
      description: 'Connect with Facebook',
      status: 'active',
      popular: true,
      logoUrl: '/img/integrations/facebook.svg'
    },
    {
      id: 'twitter',
      name: 'Twitter',
      description: 'Connect with Twitter',
      status: 'active',
      logoUrl: '/img/integrations/twitter.svg'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      description: 'Connect with Instagram',
      status: 'coming_soon',
      logoUrl: '/img/integrations/instagram.svg'
    }
  ];
}
