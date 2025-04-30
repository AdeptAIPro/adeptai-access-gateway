
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",  // Changed from "::" to a more compatible value
    port: 8080,
  },
  plugins: [
    react(),
    // Removed the componentTagger plugin which may be causing issues
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'sonner', 'react-hook-form', '@hookform/resolvers', 'zod']
  }
}));
