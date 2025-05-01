
// Re-export all icons from our categorized files and lucide-react
export * from './icons/ui-icons';
export * from './icons/status-icons';
export * from './icons/misc-icons';

// Also re-export everything from lucide-react for any other icons
export * from 'lucide-react';

// Explicitly export commonly used icons to resolve conflicts
import { Bot, Clock, Check, AlertCircle, RefreshCcw, CheckCircle, PlayCircle, MoreVertical, Copy, Trash, Share, Download, Save } from 'lucide-react';
export { Bot, Clock, Check, AlertCircle, RefreshCcw, CheckCircle, PlayCircle, MoreVertical, Copy, Trash, Share, Download, Save };
