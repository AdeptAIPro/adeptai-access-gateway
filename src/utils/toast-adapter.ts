
import { toast as sonnerToast } from "sonner";
import { ToastProps } from '@/components/ui/toast';

/**
 * This adapter allows code to use shadcn/ui toast props with sonner
 */
export const adaptShadcnToSonner = (toastProps: ToastProps): void => {
  const { title, description, variant } = toastProps;
  
  if (variant === 'destructive') {
    sonnerToast.error(title as string, { description: description as string });
  } else {
    sonnerToast(title as string, { description: description as string });
  }
};

/**
 * This function creates a toast handler that can handle both sonner-style
 * and shadcn/ui-style toast calls
 */
export const createUnifiedToastHandler = () => {
  return {
    toast: (message: string, options?: any) => {
      return sonnerToast(message, options);
    },
    error: (message: string, options?: any) => {
      return sonnerToast.error(message, options);
    },
    success: (message: string, options?: any) => {
      return sonnerToast.success(message, options);
    }
  };
};

export const unifiedToast = createUnifiedToastHandler();
