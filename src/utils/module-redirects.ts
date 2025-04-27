
// Module redirection mapping
// This maps import paths to our polyfill implementations

export const moduleRedirects: Record<string, string> = {
  'lucide-react': '@/utils/icon-polyfill',
  'react-router-dom': '@/utils/router-polyfill',
  'recharts': '@/utils/recharts-polyfill',
  'sonner': '@/utils/sonner-polyfill',
  'zod': '@/utils/zod-polyfill',
  'date-fns': '@/utils/date-polyfill'
};

// For use in dynamic import scenarios
export const getModulePolyfill = (module: string) => {
  if (moduleRedirects[module]) {
    return import(/* @vite-ignore */ moduleRedirects[module]);
  }
  return import(/* @vite-ignore */ module);
};
