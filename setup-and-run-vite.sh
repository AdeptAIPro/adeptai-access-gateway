
#!/bin/bash

echo "🔧 Setting up project dependencies and fixing React/Vite issues..."

# Install core dependencies
echo "📦 Installing core dependencies..."
npm install --save react react-dom react-router-dom sonner zod date-fns
npm install --save-dev @types/react @types/react-dom typescript

# Install lucide-react for icons
echo "📦 Installing lucide-react..."
npm install --save lucide-react

# Install vite and related dependencies
echo "📦 Installing Vite and plugins..."
npm install --save-dev vite @vitejs/plugin-react-swc

# Install additional dependencies
echo "📦 Installing additional dependencies..."
npm install --save class-variance-authority clsx tailwind-merge @radix-ui/react-slot
npm install --save react-hook-form @hookform/resolvers

# Create tsconfig.json file if it doesn't exist
if [ ! -f "tsconfig.json" ]; then
  echo "🔧 Creating tsconfig.json..."
  echo '{
    "compilerOptions": {
      "target": "ES2020",
      "useDefineForClassFields": true,
      "lib": ["ES2020", "DOM", "DOM.Iterable"],
      "module": "ESNext",
      "skipLibCheck": true,
      "moduleResolution": "bundler",
      "allowImportingTsExtensions": true,
      "resolveJsonModule": true,
      "isolatedModules": true,
      "noEmit": true,
      "jsx": "react-jsx",
      "strict": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "noFallthroughCasesInSwitch": true,
      "baseUrl": ".",
      "paths": {
        "@/*": ["./src/*"]
      }
    },
    "include": ["src"],
    "references": [{ "path": "./tsconfig.node.json" }]
  }' > tsconfig.json
fi

# Create tsconfig.node.json if it doesn't exist
if [ ! -f "tsconfig.node.json" ]; then
  echo "🔧 Creating tsconfig.node.json..."
  echo '{
    "compilerOptions": {
      "composite": true,
      "skipLibCheck": true,
      "module": "ESNext",
      "moduleResolution": "bundler",
      "allowSyntheticDefaultImports": true
    },
    "include": ["vite.config.ts"]
  }' > tsconfig.node.json
fi

# Create vite.config.ts if it doesn't exist
if [ ! -f "vite.config.ts" ]; then
  echo "🔧 Creating vite.config.ts..."
  echo 'import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});' > vite.config.ts
fi

# Run Vite using npx
echo "🚀 Starting Vite development server..."
npx vite

