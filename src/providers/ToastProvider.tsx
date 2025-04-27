
import { Toaster as SonnerToaster } from 'sonner';
import { useTheme } from "next-themes";

export function ToastProvider() {
  const { theme = "system" } = useTheme();

  return (
    <SonnerToaster
      theme={theme as "light" | "dark" | "system"}
      className="toaster group"
      richColors
      expand
      position="top-right"
    />
  );
}
