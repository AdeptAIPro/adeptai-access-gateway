
#!/bin/bash

# Install Vite and other dependencies globally
npm install -g vite @vitejs/plugin-react-swc

# Install project dependencies
npm install

# Create scripts directory if it doesn't exist
mkdir -p scripts

# Run the fix-imports script
echo "Running fix-imports script to fix lucide-react imports..."
node scripts/fix-imports.js

# Add npm bin to PATH
export PATH="$PATH:$(npm bin)"
export PATH="$PATH:$(npm config get prefix)/bin"

# Start the application
echo "Starting the application..."
npm run dev

