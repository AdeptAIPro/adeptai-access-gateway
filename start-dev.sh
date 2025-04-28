
#!/bin/bash

# Clear any previous issues
echo "Cleaning up previous builds..."
rm -rf node_modules/.vite
rm -rf dist

# Ensure node_modules exists
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Add npm bin directories to PATH
export PATH="$PATH:$(npm bin)"
export PATH="$PATH:$(npm config get prefix)/bin"
export PATH="$PATH:./node_modules/.bin"

# Find Vite executable
echo "Looking for Vite..."
if [ -f "./node_modules/.bin/vite" ]; then
  echo "Found Vite in node_modules"
  VITE_EXECUTABLE="./node_modules/.bin/vite"
elif command -v npx &> /dev/null; then
  echo "Using npx to run Vite"
  VITE_EXECUTABLE="npx vite"
else
  echo "Installing Vite locally..."
  npm install --save-dev vite
  VITE_EXECUTABLE="./node_modules/.bin/vite"
fi

# Make sure start-dev is executable
chmod +x start-dev.sh

echo "Starting development server..."
$VITE_EXECUTABLE
