
import { toast as sonnerToast } from "sonner";
import { ToastProps } from '@/components/ui/toast';
import { compatibleToast, ExtendedToastOptions } from "@/utils/toast-compat";

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
    toast: (message: string | ToastProps | ExtendedToastOptions, options?: any) => {
      return compatibleToast(message as any, options);
    },
    
    // Error toast method that accepts either format
    error: (message: string | ToastProps | ExtendedToastOptions, options?: any) => {
      return compatibleToast.error(message as any, options);
    },
    
    // Success toast method that accepts either format
    success: (message: string | ToastProps | ExtendedToastOptions, options?: any) => {
      return compatibleToast.success(message as any, options);
    }
  };
};

export const unifiedToast = createUnifiedToastHandler();
