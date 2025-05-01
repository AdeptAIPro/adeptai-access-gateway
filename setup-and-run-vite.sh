
#!/bin/bash

# Make this script executable
chmod +x setup-and-run-vite.sh

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

# Create icons-polyfill file to fix missing icon exports
echo "🔧 Creating icon polyfills..."
mkdir -p src/utils/icons

# Create icon-polyfill.tsx
mkdir -p src/utils
cat > src/utils/icon-polyfill.tsx << 'EOL'
import React from 'react';
import { 
  AlertCircle, 
  RefreshCcw, 
  CheckCircle, 
  PlayCircle, 
  MoreVertical,
  Copy, 
  Trash, 
  Share,
  Bot,
  Clock,
  Check
} from 'lucide-react';

// Re-export all the icons used in the project
export {
  AlertCircle, 
  RefreshCcw, 
  CheckCircle, 
  PlayCircle, 
  MoreVertical,
  Copy, 
  Trash, 
  Share,
  Bot,
  Clock,
  Check
};

// Export default for compatibility
export default {
  AlertCircle, 
  RefreshCcw, 
  CheckCircle, 
  PlayCircle, 
  MoreVertical,
  Copy, 
  Trash, 
  Share,
  Bot,
  Clock,
  Check
};
EOL

# Create sonner-polyfill.tsx
cat > src/utils/sonner-polyfill.tsx << 'EOL'
import { toast } from 'sonner';

// Re-export everything from sonner
export * from 'sonner';

// Export toast directly for compatibility
export { toast };

// Export default for compatibility
export default toast;
EOL

# Update the @tanstack/react-query import in AppProvider.tsx
echo "🔧 Fixing QueryClientProvider import in AppProvider.tsx..."
cat > src/providers/AppProvider.tsx << 'EOL'
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/hooks/use-auth';

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </QueryClientProvider>
  );
};
EOL

# Create a basic Badge component that accepts className prop
echo "🔧 Creating Badge component that accepts className prop..."
mkdir -p src/components/ui
cat > src/components/ui/badge.tsx << 'EOL'
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success: "border-transparent bg-emerald-500 text-white hover:bg-emerald-500/80",
        ghost: "border-transparent bg-muted text-muted-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
EOL

# Create utils.ts for cn function
mkdir -p src/lib
cat > src/lib/utils.ts << 'EOL'
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
EOL

# Create proper tsconfig.json file
echo "🔧 Creating tsconfig.json..."
cat > tsconfig.json << 'EOL'
{
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
}
EOL

# Create tsconfig.node.json
cat > tsconfig.node.json << 'EOL'
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
EOL

# Update vite.config.ts
echo "🔧 Updating vite.config.ts..."
cat > vite.config.ts << 'EOL'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'sonner', 'react-hook-form', '@hookform/resolvers', 'zod']
  }
});
EOL

# Install additional packages for class-variance-authority
npm install class-variance-authority clsx tailwind-merge

# Fix package.json
echo "🔧 Updating package.json..."
cat > package.json << 'EOL'
{
  "name": "vite-react-app",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tanstack/react-query": "^5.0.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "date-fns": "^2.30.0",
    "lucide-react": "^0.268.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.15.0",
    "sonner": "^0.7.0",
    "tailwind-merge": "^1.14.0",
    "zod": "^3.22.2"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react-swc": "^3.3.2",
    "typescript": "^5.0.2",
    "vite": "^4.4.5"
  }
}
EOL

# Run Vite using npx to ensure we use the locally installed version
echo "🚀 Starting Vite development server..."
npx vite
