
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

# Install missing dependencies
echo "📦 Installing missing dependencies..."
npm install --save react-router-dom sonner zod react-hook-form @hookform/resolvers date-fns
npm install --save-dev vite @vitejs/plugin-react-swc typescript

# Verify Vite installation
if [ ! -f "./node_modules/.bin/vite" ]; then
  echo "📦 Installing Vite locally..."
  npm install --save-dev vite@latest
fi

# Clear any previous issues
echo "🧹 Cleaning up previous builds..."
rm -rf node_modules/.vite
rm -rf dist

# Start the app
echo "🚀 Starting development server..."

if [ -f "./node_modules/.bin/vite" ]; then
  echo "Using local Vite installation"
  ./node_modules/.bin/vite
elif command -v npx &> /dev/null; then
  echo "Using npx to run Vite"
  npx vite
else
  echo "Trying npm run dev"
  npm run dev
fi

# If all else fails, inform the user
if [ $? -ne 0 ]; then
  echo "❌ Failed to start the development server."
  echo "Try manually running: npm run dev"
fi
