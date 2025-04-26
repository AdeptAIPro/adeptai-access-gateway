
/**
 * This file is a helper for module resolution
 * In a real project, you would configure module resolution in tsconfig.json or webpack config
 */

// Simulated module resolution for lucide-react
const moduleRedirects = {
  'lucide-react': './src/utils/lucide-polyfill.ts',
  'date-fns': './src/utils/date-polyfill.ts'
};

export default moduleRedirects;
