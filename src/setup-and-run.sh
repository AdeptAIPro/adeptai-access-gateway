
#!/bin/bash

# Make fix-imports script executable
if [ -f "scripts/fix-imports.js" ]; then
  chmod +x scripts/fix-imports.js
elif [ -f "src/scripts/fix-imports.js" ]; then
  chmod +x src/scripts/fix-imports.js
fi

# Ensure vite is installed
echo "Installing Vite and dependencies..."
npm install --save-dev vite @vitejs/plugin-react-swc

# Install project dependencies
npm install

# Run the fix-imports script
echo "Running fix-imports script to fix lucide-react imports..."
if [ -f "scripts/fix-imports.js" ]; then
  node scripts/fix-imports.js
elif [ -f "src/scripts/fix-imports.js" ]; then
  node src/scripts/fix-imports.js
else
  echo "Creating scripts directory and fix-imports script..."
  mkdir -p src/scripts
  node src/scripts/fix-imports.js
fi

# Add npm bin to PATH
export PATH="$PATH:$(npm bin)"
export PATH="$PATH:$(npm config get prefix)/bin"
export PATH="$PATH:./node_modules/.bin"

# Start the application
echo "Starting the application..."
npx vite
