
/**
 * This file redirects all lucide-react imports to our icon polyfill
 * This ensures we have consistent icon usage across the application
 */

// Re-export everything from our icon polyfill
export * from './icon-polyfill';

// Also create a default export for compatibility
import icons from './icon-polyfill';
export default icons;
