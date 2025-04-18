
import { Integration } from './categories';

export function createProductivityList(): Integration[] {
  return [
    {
      id: 'slack',
      name: 'Slack',
      description: 'Connect with Slack',
      status: 'active',
      popular: true,
      logoUrl: '/img/integrations/slack.svg'
    },
    {
      id: 'microsoft-teams',
      name: 'Microsoft Teams',
      description: 'Connect with Microsoft Teams',
      status: 'active',
      logoUrl: '/img/integrations/teams.svg'
    },
    {
      id: 'google-calendar',
      name: 'Google Calendar',
      description: 'Connect with Google Calendar',
      status: 'coming_soon',
      logoUrl: '/img/integrations/gcal.svg'
    }
  ];
}
