
import { toast as sonnerToast } from "sonner";
import { unifiedToast } from "@/utils/toast-adapter";
import { ToastProps } from "@/components/ui/toast";
import { compatibleToast, ExtendedToastOptions } from "@/utils/toast-compat";

type ToastMessage = string | (ToastProps & { description?: React.ReactNode }) | ExtendedToastOptions;
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
    return compatibleToast(message as any, options);
  };

  const showSuccess = (message: ToastMessage, options?: ToastOptions) => {
    return compatibleToast.success(message as any, options);
  };

  const showError = (message: ToastMessage, options?: ToastOptions) => {
    return compatibleToast.error(message as any, options);
  };

  return {
    toast: showToast,
    success: showSuccess,
    error: showError,
  };
}

// For direct usage without hook - use the compatible version
export { compatibleToast as toast };
