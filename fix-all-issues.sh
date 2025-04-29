
#!/bin/bash

echo "🔧 Starting comprehensive fixes for build errors..."

# Make scripts executable
chmod +x setup-dependencies.sh
chmod +x run-fix-imports.sh
chmod +x start-dev.sh

# Make sure node_modules exists
if [ ! -d "node_modules" ]; then
  echo "📦 Installing all dependencies..."
  npm install
  
  # Install specific missing dependencies
  npm install react-router-dom sonner zod react-hook-form @hookform/resolvers
  npm install --save-dev vite @vitejs/plugin-react-swc
fi

# Run fix-imports to correct import paths
echo "🔧 Fixing import issues..."
node fix-imports.js

# Ensure vite is properly installed
if [ ! -f "./node_modules/.bin/vite" ]; then
  echo "📦 Reinstalling Vite..."
  npm install --save-dev vite@latest
fi

# Add PATH for npm bin
export PATH="$PATH:$(npm bin)"
export PATH="$PATH:$(npm config get prefix)/bin"
export PATH="$PATH:./node_modules/.bin"

# Start the development server
echo "🚀 Starting development server..."
npx vite

