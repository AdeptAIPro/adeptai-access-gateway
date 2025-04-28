
#!/bin/bash

# Make script executable
chmod +x ./start-app.sh

# Clear any previous issues
echo "Cleaning up previous builds..."
rm -rf node_modules/.vite
rm -rf dist

# Install dependencies if needed
echo "Installing dependencies..."
npm install --no-save vite@latest --silent
npm install --no-save lucide-react react-router-dom sonner recharts date-fns zod --silent

# Add npm bin directories to PATH
export PATH="$PATH:$(npm bin)"
export PATH="$PATH:$(npm config get prefix)/bin"
export PATH="$PATH:./node_modules/.bin"

echo "Starting development server..."
# Try multiple ways to start vite
if command -v ./node_modules/.bin/vite &> /dev/null; then
  echo "Using local vite from node_modules..."
  ./node_modules/.bin/vite
elif command -v npx &> /dev/null; then
  echo "Using npx to run vite..."
  npx vite
elif command -v npm &> /dev/null; then
  echo "Using npm run to run vite..."
  npm run dev
else
  echo "Failed to start Vite. Please install Node.js and npm."
  exit 1
fi
