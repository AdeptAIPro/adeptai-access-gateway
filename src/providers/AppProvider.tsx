
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientConfig } from "@tanstack/react-query";
import { AuthProvider } from "@/hooks/use-auth";
import { CredentialsProvider } from "@/context/CredentialsContext";
import { SecurityProvider } from "./SecurityProvider";

// Create a client with type-safe config
const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
      refetchOnWindowFocus: false,
    },
  },
};

// Create a client
const queryClient = new QueryClient(queryClientConfig);

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    // @ts-ignore - QueryClientProvider is available but TypeScript doesn't detect it properly
    <QueryClient.Provider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SecurityProvider>
          <AuthProvider>
            <CredentialsProvider>{children}</CredentialsProvider>
          </AuthProvider>
        </SecurityProvider>
      </ThemeProvider>
    </QueryClient.Provider>
  );
}
