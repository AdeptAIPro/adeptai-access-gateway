
import { toast as sonnerToast } from "sonner";
import { ToastProps } from '@/components/ui/toast';

/**
 * This adapter allows code to use shadcn/ui toast props with sonner
 */
export const adaptShadcnToSonner = (toastProps: ToastProps): void => {
  const { title, description, variant } = toastProps;
  
  if (variant === 'destructive') {
    sonnerToast.error(title as string, { description });
  } else {
    sonnerToast(title as string, { description });
  }
};

/**
 * This function creates a toast handler that can handle both sonner-style
 * and shadcn/ui-style toast calls
 */
export const createUnifiedToastHandler = () => {
  return {
    toast: (message: string | ToastProps, options?: any) => {
      if (typeof message === 'object' && 'title' in message) {
        // It's a shadcn/ui-style toast
        adaptShadcnToSonner(message);
        return message;
      } else {
        // It's a sonner-style toast
        return sonnerToast(message as string, options);
      }
    },
    error: (message: string | ToastProps, options?: any) => {
      if (typeof message === 'object' && 'title' in message) {
        // It's a shadcn/ui-style toast
        adaptShadcnToSonner({ ...message, variant: 'destructive' });
        return message;
      } else {
        // It's a sonner-style toast
        return sonnerToast.error(message as string, options);
      }
    },
    success: (message: string | ToastProps, options?: any) => {
      if (typeof message === 'object' && 'title' in message) {
        // It's a shadcn/ui-style toast
        adaptShadcnToSonner(message);
        return message;
      } else {
        // It's a sonner-style toast
        return sonnerToast.success(message as string, options);
      }
    }
  };
};

export const unifiedToast = createUnifiedToastHandler();
