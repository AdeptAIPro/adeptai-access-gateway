
import { toast as sonnerToast } from '@/utils/sonner-polyfill';

interface ToastProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success';
  [key: string]: any;
}

export const useToast = () => {
  const showToast = ({ title, description, variant, ...props }: ToastProps) => {
    if (variant === 'destructive') {
      sonnerToast.error(title || '', {
        description,
        ...props
      });
    } else if (variant === 'success') {
      sonnerToast.success(title || '', {
        description,
        ...props
      });
    } else {
      sonnerToast(title || '', {
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
export const toast = sonnerToast;
