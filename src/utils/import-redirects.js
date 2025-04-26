
/**
 * This file is a helper for module resolution
 * In a real project, you would configure module resolution in tsconfig.json or webpack config
 */

// Simulated module resolution for various libraries
const moduleRedirects = {
  'lucide-react': './src/utils/lucide-polyfill.ts',
  'date-fns': './src/utils/date-polyfill.ts',
  'react-router-dom': './src/utils/router-polyfill.tsx',
  'recharts': './src/utils/recharts-polyfill.tsx',
  'sonner': './src/utils/sonner-polyfill.tsx',
  'zod': './src/utils/zod-polyfill.ts'
};

export default moduleRedirects;
