
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "@/utils/router-polyfill";
import { AuthProvider } from "@/hooks/use-auth";
import { CredentialsProvider } from "@/context/CredentialsContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ToastProvider } from "./ToastProvider";
import { Suspense } from "react";

// Loading component
const AppLoader = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-12 w-12 animate-spin text-primary">Loading...</div>
  </div>
);

// Create a client with production-ready settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
});

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <CredentialsProvider>
            <TooltipProvider>
              <Suspense fallback={<AppLoader />}>
                {children}
              </Suspense>
              <ToastProvider />
            </TooltipProvider>
          </CredentialsProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
