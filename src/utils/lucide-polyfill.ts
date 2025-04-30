
// This file provides a centralized polyfill for lucide-react icons
// Import from this file instead of directly from lucide-react

// Re-export all categorized icons from our local icon files
export * from './icons/ui-icons';
export * from './icons/data-icons';
export * from './icons/communication-icons';
export * from './icons/status-icons';
export * from './icons/user-icons';
export * from './icons/chart-icons';
export * from './icons/misc-icons';
export * from './icons/commerce-icons';

// Also re-export directly from lucide-react for any icons not in our categorized files
export * from 'lucide-react';

// Standard icons used throughout the app
import {
  Check,
  Clock,
  AlertCircle,
  Bot,
  RefreshCcw,
  CheckCircle,
  PlayCircle,
  MoreVertical,
  Copy,
  Trash,
  Share
} from 'lucide-react';

export {
  Check,
  Clock, 
  AlertCircle,
  Bot,
  RefreshCcw,
  CheckCircle,
  PlayCircle,
  MoreVertical,
  Copy,
  Trash,
  Share
};

// Create a default export combining all icons for backwards compatibility
import * as uiIcons from './icons/ui-icons';
import * as dataIcons from './icons/data-icons';
import * as communicationIcons from './icons/communication-icons';
import * as statusIcons from './icons/status-icons';
import * as userIcons from './icons/user-icons';
import * as chartIcons from './icons/chart-icons';
import * as miscIcons from './icons/misc-icons';
import * as commerceIcons from './icons/commerce-icons';

const icons = {
  ...uiIcons,
  ...dataIcons,
  ...communicationIcons,
  ...statusIcons,
  ...userIcons,
  ...chartIcons,
  ...miscIcons,
  ...commerceIcons
};

export default icons;
