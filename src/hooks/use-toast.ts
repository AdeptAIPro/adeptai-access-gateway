
import { toast as sonnerToast } from "sonner";
import { unifiedToast } from "@/utils/toast-adapter";
import { ToastProps } from "@/components/ui/toast";

type ToastMessage = string | ToastProps;
type ToastOptions = {
  description?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
};

export function useToast() {
  const showToast = (message: ToastMessage, options?: ToastOptions) => {
    return unifiedToast.toast(message as any, options);
  };

  const showSuccess = (message: ToastMessage, options?: ToastOptions) => {
    return unifiedToast.success(message as any, options);
  };

  const showError = (message: ToastMessage, options?: ToastOptions) => {
    return unifiedToast.error(message as any, options);
  };

  return {
    toast: showToast,
    success: showSuccess,
    error: showError,
  };
}

// For direct usage without hook
export { sonnerToast as toast };
