
#!/bin/bash

# Make fix-imports script executable
chmod +x scripts/fix-imports.js

# Install Vite and other dependencies globally
npm install -g vite @vitejs/plugin-react-swc

# Install project dependencies
npm install

# Create scripts directory if it doesn't exist
mkdir -p scripts

# Run the fix-imports script
echo "Running fix-imports script to fix lucide-react imports..."
if [ -f "scripts/fix-imports.js" ]; then
  node scripts/fix-imports.js
elif [ -f "src/utils/fix-imports.js" ]; then
  node src/utils/fix-imports.js
else
  echo "Warning: fix-imports.js not found"
fi

# Add npm bin to PATH
export PATH="$PATH:$(npm bin)"
export PATH="$PATH:$(npm config get prefix)/bin"
export PATH="$PATH:./node_modules/.bin"

# Try to find vite executable
VITE_PATH=$(which vite || echo "")
if [ -z "$VITE_PATH" ]; then
  VITE_PATH="./node_modules/.bin/vite"
  if [ ! -f "$VITE_PATH" ]; then
    echo "Installing Vite locally..."
    npm install --save-dev vite
  fi
fi

echo "Using Vite from: $VITE_PATH"

# Start the application
echo "Starting the application..."
$VITE_PATH || npx vite
