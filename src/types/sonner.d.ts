
import 'sonner';

declare module 'sonner' {
  interface Toast {
    (message: string, options?: ToastOptions): string;
    success(message: string, options?: ToastOptions): string;
    error(message: string, options?: ToastOptions): string;
    info(message: string, options?: ToastOptions): string;
    warning(message: string, options?: ToastOptions): string;
  }
  
  interface ToastOptions {
    description?: React.ReactNode;
    duration?: number;
    icon?: React.ReactNode;
    id?: string;
    onDismiss?: (toast: ToastT) => void;
    onAutoClose?: (toast: ToastT) => void;
    position?: Position;
    action?: {
      label: string;
      onClick: () => void;
    };
    [key: string]: any;
  }
}
