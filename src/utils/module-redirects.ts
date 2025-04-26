
// Module redirection mapping
// This maps import paths to our polyfill implementations

export const moduleRedirects: Record<string, string> = {
  'react-router-dom': './router-polyfill',
  'recharts': './recharts-polyfill',
  'sonner': './sonner-polyfill',
  'zod': './zod-polyfill',
  'date-fns': './date-polyfill'
};

// For use in dynamic import scenarios
export const getModulePolyfill = (module: string) => {
  if (moduleRedirects[module]) {
    return import(/* @vite-ignore */ moduleRedirects[module]);
  }
  return import(/* @vite-ignore */ module);
};
