
#!/bin/bash

echo "🔧 Starting comprehensive fixes for build errors..."

# Make script executable
chmod +x fix-all-issues.sh
chmod +x start-dev.sh

# Create utility directories if they don't exist
mkdir -p src/utils
mkdir -p src/utils/icons
mkdir -p src/lib

# Install core dependencies
echo "📦 Installing project dependencies..."
npm install --save react-router-dom sonner zod react-hook-form @hookform/resolvers date-fns uuid
npm install --save-dev vite@latest @vitejs/plugin-react-swc typescript @types/uuid

# Run the fix-imports script to fix import paths
echo "🔧 Running import fixes..."
node fix-imports.js

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

# Install Vite globally in case it's not found locally
echo "📦 Ensuring Vite is installed..."
npm install -g vite

# Update the start-dev.sh script to be more robust
cat > start-dev.sh << 'EOL'
#!/bin/bash

echo "🚀 Starting development environment..."

# Make this script executable
chmod +x start-dev.sh

# Ensure node_modules exists
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Add npm bin directories to PATH
export PATH="$PATH:$(npm bin)"
export PATH="$PATH:$(npm config get prefix)/bin"
export PATH="$PATH:./node_modules/.bin"

# Install missing dependencies if needed
if ! npm list vite >/dev/null 2>&1; then
  echo "📦 Installing Vite..."
  npm install --save-dev vite@latest
fi

# Clear any previous issues
echo "🧹 Cleaning up previous builds..."
rm -rf node_modules/.vite
rm -rf dist

# Start the app
echo "🚀 Starting development server..."

# Try different ways to start Vite
if [ -f "./node_modules/.bin/vite" ]; then
  echo "Using local Vite installation"
  ./node_modules/.bin/vite
elif command -v vite &> /dev/null; then
  echo "Using global Vite installation"
  vite
elif command -v npx &> /dev/null; then
  echo "Using npx to run Vite"
  npx vite
else
  echo "❌ Failed to start the development server."
  echo "Try running: npm run dev"
  npm run dev
fi
EOL

# Make the start-dev.sh script executable
chmod +x start-dev.sh

echo "✅ All fixes have been applied!"
echo "🚀 You can now start the development server with: ./start-dev.sh"
