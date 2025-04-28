
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

# Verify Vite installation
if [ ! -f "./node_modules/.bin/vite" ]; then
  echo "📦 Installing Vite locally..."
  npm install --save-dev vite@latest
fi

# Clear any previous issues
echo "🧹 Cleaning up previous builds..."
rm -rf node_modules/.vite
rm -rf dist

# Check if react, react-dom, and react-router-dom are installed
if ! npm list react >/dev/null 2>&1; then
  echo "📦 Installing React..."
  npm install react react-dom
fi

if ! npm list react-router-dom >/dev/null 2>&1; then
  echo "📦 Installing React Router..."
  npm install react-router-dom
fi

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
