
import React from 'react';

// Re-export all categorized icons
export * from './icons/ui-icons';
export * from './icons/status-icons';
export * from './icons/misc-icons';
export * from './icons/data-icons';
export * from './icons/communication-icons';
export * from './icons/user-icons';
export * from './icons/chart-icons';
export * from './icons/commerce-icons';

// Also re-export directly from lucide-react for any icons not in our categorized files
export * from 'lucide-react';

// Explicitly export commonly used icons to ensure they're available
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
} from 'lucide-react';
