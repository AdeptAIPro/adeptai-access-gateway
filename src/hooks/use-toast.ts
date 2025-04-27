
// We'll create a thin wrapper around sonner to maintain compatibility
import { toast as sonnerToast } from "sonner";

// Export a toast object that matches both the sonner API and our expected interface
export const toast = sonnerToast;

// Hook for component usage
export const useToast = () => {
  return { toast: sonnerToast };
};
