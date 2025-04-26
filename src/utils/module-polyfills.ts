
/**
 * This file provides module import mappings for various libraries
 */

// Re-export date functions
import * as dateFns from './date-polyfill';
export { dateFns };

// Import and re-export lucide icons
import * as lucideReact from './lucide-polyfill';
export { lucideReact };

// Export shorthand to simplify imports
export const lucide = lucideReact;
export const dateFunctions = dateFns;
