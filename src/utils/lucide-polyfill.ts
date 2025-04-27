
// Provide a clean redirect to use our icon-polyfill

// Re-export all icons from our icon polyfill
export * from './icon-polyfill';

// Also provide a default export for compatibility
import * as icons from './icon-polyfill';
export default icons;
