
import { toast } from '@/utils/sonner-polyfill';

interface ToastProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success';
  [key: string]: any;
}

export const useToast = () => {
  const showToast = ({ title, description, variant, ...props }: ToastProps) => {
    if (variant === 'destructive') {
      toast.error(title || '', {
        description,
        ...props
      });
    } else if (variant === 'success') {
      toast.success(title || '', {
        description,
        ...props
      });
    } else {
      toast(title || '', {
        description,
        ...props
      });
    }
  };

  return {
    toast: showToast
  };
};

// Export toast directly so it can be imported from this file
export { toast };
