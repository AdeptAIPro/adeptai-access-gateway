
/**
 * This file redirects all lucide-react imports to our icon polyfill
 * This ensures we have consistent icon usage across the application
 */

// Re-export everything from our icon polyfill
export * from './lucide-polyfill';

// Also create a default export for compatibility
import * as icons from './lucide-polyfill';
export default icons;
