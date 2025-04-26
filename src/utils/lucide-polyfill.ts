
/**
 * This file provides a fallback mechanism for importing lucide icons
 * It redirects lucide-react imports to our icon-polyfill
 */

import icons from './icon-polyfill';
export * from './icon-polyfill';

// Mock icon factory to handle missing icons
export const Icon = ({ name, ...props }: { name: string; [key: string]: any }) => {
  // @ts-ignore - We know these icons exist in our polyfill
  const IconComponent = icons[name] || icons.HelpCircle;
  return IconComponent(props);
};

// Re-export everything from icon-polyfill
export default icons;
