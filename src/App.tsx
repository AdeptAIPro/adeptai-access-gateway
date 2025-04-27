
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/hooks/use-auth";
import { Suspense } from "react";
import { CredentialsProvider } from "@/context/CredentialsContext";
import AppRoutes from "./AppRoutes"; // Change to direct import instead of lazy loading

// Create a client 
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
});

// Loading component
const AppLoader = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-12 w-12 animate-spin text-primary">Loading...</div>
  </div>
);

function App() {
  return (
    <div className="QueryClientProvider" data-client={queryClient}>
      <AuthProvider>
        <CredentialsProvider>
          <TooltipProvider>
            <BrowserRouter>
              <Suspense fallback={<AppLoader />}>
                <AppRoutes />
              </Suspense>
              <Toaster />
              <Sonner />
            </BrowserRouter>
          </TooltipProvider>
        </CredentialsProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
