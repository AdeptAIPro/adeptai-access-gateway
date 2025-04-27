
/**
 * This file adds extra functionality to handle lucide-react imports and components
 * that are using the lucide-react icons in a way that requires TypeScript compatibility
 */

import React from 'react';
import * as icons from './icon-polyfill';
export * from './icon-polyfill';

// Create a component factory for dynamic icon usage
export const createIconComponent = (iconName: string) => {
  // @ts-ignore - We know these icons exist in our polyfill
  const IconComponent = icons[iconName] || icons.HelpCircle;
  return React.createElement(IconComponent);
};

// Export an Icon component that can be used directly
export const Icon = ({ name, ...props }: { name: string; [key: string]: any }) => {
  // @ts-ignore - We know these icons exist in our polyfill
  const IconComponent = icons[name] || icons.HelpCircle;
  return React.createElement(IconComponent, props);
};

export default icons;
