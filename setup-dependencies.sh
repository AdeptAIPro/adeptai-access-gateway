
#!/bin/bash

echo "📦 Installing project dependencies..."

# Install core dependencies
npm install react-router-dom sonner zod react-hook-form @hookform/resolvers date-fns uuid

# Install UI and visualization libraries
npm install lucide-react recharts next-themes class-variance-authority clsx tailwind-merge

# Install dev dependencies
npm install --save-dev vite @vitejs/plugin-react-swc typescript @types/uuid

# Create utility directories if they don't exist
mkdir -p src/utils
mkdir -p src/lib

# Create a basic lib/utils.ts if it doesn't exist
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

echo "✅ All dependencies installed successfully!"
