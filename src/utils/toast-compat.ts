
import { toast as sonnerToast } from "sonner";
import { ToastProps } from "@/components/ui/toast";
import { ReactNode } from 'react';

/**
 * A compatibility layer to solve the TypeScript errors with the toast function
 * This ensures type safety and compatibility across the application
 */

// Define an extended toast options type that includes description
export interface ExtendedToastOptions {
  title?: string;
  description?: ReactNode;
  variant?: 'default' | 'destructive';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Augment the ToastProps type to include description
declare module "@/components/ui/toast" {
  interface ToastProps {
    description?: React.ReactNode;
  }
}

// Flexibly handle both the shadcn format and the sonner format
export const createCompatibleToast = () => {
  const compatibleToast = (options: string | ExtendedToastOptions | (ToastProps & { description?: React.ReactNode }), opts?: any) => {
    if (typeof options === 'string') {
      // It's a simple string message
      return sonnerToast(options, opts);
    } else {
      // It's an object with our extended properties
      const { title, description, variant, action, ...rest } = options as ExtendedToastOptions;
      
      if (variant === 'destructive') {
        return sonnerToast.error(title as string, {
          description,
          action,
          ...rest
        });
      } else {
        return sonnerToast(title as string, {
          description,
          action,
          ...rest
        });
      }
    }
  };
  
  // Add error, success, warning variants
  compatibleToast.error = (options: string | ExtendedToastOptions | (ToastProps & { description?: React.ReactNode }), opts?: any) => {
    if (typeof options === 'string') {
      return sonnerToast.error(options, opts);
    } else {
      const { title, description, ...rest } = options as ExtendedToastOptions;
      return sonnerToast.error(title as string, {
        description,
        ...rest
      });
    }
  };
  
  compatibleToast.success = (options: string | ExtendedToastOptions | (ToastProps & { description?: React.ReactNode }), opts?: any) => {
    if (typeof options === 'string') {
      return sonnerToast.success(options, opts);
    } else {
      const { title, description, ...rest } = options as ExtendedToastOptions;
      return sonnerToast.success(title as string, {
        description,
        ...rest
      });
    }
  };
  
  compatibleToast.warning = (options: string | ExtendedToastOptions | (ToastProps & { description?: React.ReactNode }), opts?: any) => {
    if (typeof options === 'string') {
      return sonnerToast.warning(options, opts);
    } else {
      const { title, description, ...rest } = options as ExtendedToastOptions;
      return sonnerToast.warning(title as string, {
        description,
        ...rest
      });
    }
  };
  
  compatibleToast.info = (options: string | ExtendedToastOptions | (ToastProps & { description?: React.ReactNode }), opts?: any) => {
    if (typeof options === 'string') {
      return sonnerToast.info(options, opts);
    } else {
      const { title, description, ...rest } = options as ExtendedToastOptions;
      return sonnerToast.info(title as string, {
        description,
        ...rest
      });
    }
  };
  
  return compatibleToast;
};

// Export the compatible toast instance
export const compatibleToast = createCompatibleToast();

// Export original sonner toast for advanced usage
export { sonnerToast };
