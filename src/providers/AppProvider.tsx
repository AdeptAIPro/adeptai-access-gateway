
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider as TanstackQueryProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/hooks/use-auth";
import { CredentialsProvider } from "@/context/CredentialsContext";
import { SecurityProvider } from "./SecurityProvider";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
      refetchOnWindowFocus: false,
    },
  },
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <TanstackQueryProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SecurityProvider>
          <AuthProvider>
            <CredentialsProvider>{children}</CredentialsProvider>
          </AuthProvider>
        </SecurityProvider>
      </ThemeProvider>
    </TanstackQueryProvider>
  );
}
