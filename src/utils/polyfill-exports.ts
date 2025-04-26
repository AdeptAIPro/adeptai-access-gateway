
// This file re-exports all polyfills from a single location

// Re-export date polyfill
export * as dateFns from './date-polyfill';

// Re-export router polyfill as react-router-dom
export * as reactRouterDom from './router-polyfill';

// Re-export recharts polyfill
export * as rechartsLib from './recharts-polyfill';

// Re-export sonner polyfill
export * as sonnerLib from './sonner-polyfill';

// Re-export zod polyfill
export * as zodLib from './zod-polyfill';
