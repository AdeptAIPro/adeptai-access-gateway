
import { toast as sonnerToast } from '@/utils/sonner-polyfill';

interface ToastProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success';
  [key: string]: any;
}

export const useToast = () => {
  const showToast = (props: ToastProps | string) => {
    // Handle both string and object formats
    if (typeof props === 'string') {
      sonnerToast(props);
      return;
    }
    
    const { title, description, variant, ...rest } = props;
    
    if (variant === 'destructive') {
      sonnerToast.error(title || '', {
        description,
        ...rest
      });
    } else if (variant === 'success') {
      sonnerToast.success(title || '', {
        description,
        ...rest
      });
    } else {
      sonnerToast(title || '', {
        description,
        ...rest
      });
    }
  };

  return {
    toast: showToast
  };
};

// Export toast directly so it can be imported from this file
export const toast = sonnerToast;
