
/**
 * This file provides module import mappings for various libraries
 */

// Re-export date functions
import * as dateFns from './date-polyfill';
export { dateFns };

// Import and re-export lucide icons
import * as lucideReact from './lucide-polyfill';
export { lucideReact };

// Import and re-export router polyfill
import * as reactRouterDom from './router-polyfill';
export { reactRouterDom };

// Import and re-export recharts polyfill
import * as recharts from './recharts-polyfill';
export { recharts };

// Import and re-export sonner polyfill
import * as sonner from './sonner-polyfill';
export { sonner };

// Import and re-export zod polyfill
import * as zod from './zod-polyfill';
export { zod };

// Export shorthand to simplify imports
export const lucide = lucideReact;
export const dateFunctions = dateFns;
export const router = reactRouterDom;
export const charts = recharts;
export const toast = sonner;
export const z = zod.z;

// Create a README for implementation
export const implementationReadme = `
# Module Polyfill System

This system provides polyfill implementations for various libraries
when they can't be properly installed in the environment.

## Available Polyfills:

1. lucide-react -> Use @/utils/lucide-polyfill
2. date-fns -> Use @/utils/date-polyfill
3. react-router-dom -> Use @/utils/router-polyfill
4. recharts -> Use @/utils/recharts-polyfill
5. sonner -> Use @/utils/sonner-polyfill
6. zod -> Use @/utils/zod-polyfill

## How to use:

Import from the polyfill modules directly:

\`\`\`tsx
// Instead of: import { format } from 'date-fns';
import { format } from '@/utils/date-polyfill';

// Instead of: import { User } from 'lucide-react';
import { User } from '@/utils/lucide-polyfill';

// Instead of: import { Link } from 'react-router-dom';
import { Link } from '@/utils/router-polyfill';
\`\`\`

Or use the utility export:

\`\`\`tsx
import { dateFns, lucide, router } from '@/utils/module-polyfills';

// Then use as:
dateFns.format(new Date(), 'yyyy-MM-dd');
const UserIcon = lucide.User;
<router.Link to="/">Home</router.Link>
\`\`\`
`;
