
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
    // Standard toast method that accepts either format
    toast: (message: string | ToastProps, options?: any) => {
      if (typeof message === 'object') {
        // It's a shadcn-style object
        adaptShadcnToSonner(message);
        return message;
      } else {
        // It's a sonner-style call
        return sonnerToast(message, options);
      }
    },
    
    // Error toast method that accepts either format
    error: (message: string | ToastProps, options?: any) => {
      if (typeof message === 'object') {
        // It's a shadcn-style object with variant
        message.variant = 'destructive';
        adaptShadcnToSonner(message);
        return message;
      } else {
        // It's a sonner-style call
        return sonnerToast.error(message, options);
      }
    },
    
    // Success toast method that accepts either format
    success: (message: string | ToastProps, options?: any) => {
      if (typeof message === 'object') {
        // It's a shadcn-style object
        adaptShadcnToSonner(message);
        return message;
      } else {
        // It's a sonner-style call
        return sonnerToast.success(message, options);
      }
    }
  };
};

export const unifiedToast = createUnifiedToastHandler();
