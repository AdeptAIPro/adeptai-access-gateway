
import { toast } from 'sonner';

export const useToast = () => {
  return { toast };
};

// Export toast directly so it can be imported from this file
export { toast };
