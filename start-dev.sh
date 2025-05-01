
#!/bin/bash

echo "🚀 Starting developer setup and application..."

# Make all scripts executable
chmod +x run-vite.sh
chmod +x fix-dependencies.sh
chmod +x start-dev.sh
chmod +x setup-and-run-vite.sh
chmod +x init.sh
[ -f "make-fix-executable.sh" ] && chmod +x make-fix-executable.sh

# Create directories if they don't exist
mkdir -p src/utils/icons
mkdir -p src/lib

# Create lib/utils.ts if it doesn't exist
if [ ! -f "src/lib/utils.ts" ]; then
  echo "Creating utils.ts..."
  cat > src/lib/utils.ts <<EOL
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
EOL
fi

# Install required dependencies
echo "📦 Installing core dependencies..."
npm install --save react react-dom react-router-dom sonner date-fns zod lucide-react
npm install --save-dev @types/react @types/react-dom typescript
npm install --save class-variance-authority clsx tailwind-merge @radix-ui/react-slot

# Install Vite and its dependencies
echo "📦 Installing Vite..."
npm install --save-dev vite @vitejs/plugin-react-swc

# Fix PATH to include node_modules/.bin
export PATH="$PATH:$(npm bin)"
export PATH="$PATH:$(npm config get prefix)/bin"
export PATH="$PATH:./node_modules/.bin"

# Create a tsconfig.json file if it doesn't exist
if [ ! -f "tsconfig.json" ]; then
  echo "🔧 Creating tsconfig.json..."
  cat > tsconfig.json << EOL
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
fi

# Create tsconfig.node.json if it doesn't exist
if [ ! -f "tsconfig.node.json" ]; then
  echo "🔧 Creating tsconfig.node.json..."
  cat > tsconfig.node.json << EOL
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
fi

# Start the development server using the local Vite
echo "🚀 Starting development server..."
npx vite
