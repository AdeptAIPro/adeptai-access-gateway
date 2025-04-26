
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/hooks/use-auth";
import { Suspense, lazy } from "react";
import { CredentialsProvider } from "@/context/CredentialsContext";

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

// Lazy load AppRoutes for better initial load performance
const AppRoutes = lazy(() => import("./AppRoutes"));

// Loading component
const AppLoader = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-12 w-12 animate-spin text-primary">Loading...</div>
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
