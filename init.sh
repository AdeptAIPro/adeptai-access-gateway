
#!/bin/bash

# Make sure we're in the project root
cd "$(dirname "$0")"

# Make scripts executable
chmod +x setup.sh
chmod +x start-app.sh
chmod +x fix-all-imports.sh

# Ensure npm is available
if ! command -v npm &> /dev/null; then
  echo "npm is not installed. Please install Node.js and npm."
  exit 1
fi

# Update npm to the latest version
echo "Updating npm to latest version..."
npm install -g npm@latest

# Clear npm cache
echo "Clearing npm cache..."
npm cache clean --force

# Install Vite globally
echo "Installing Vite globally..."
npm install -g vite

# Install important dependencies locally
echo "Installing critical dependencies..."
npm install --no-save vite lucide-react react-router-dom sonner recharts date-fns zod uuid

# Run the setup
echo "Running setup script..."
./setup.sh

# Fix all imports
echo "Fixing imports..."
./fix-all-imports.sh

# Create a simple package.json if it doesn't exist
if [ ! -f "package.json" ]; then
  echo "Creating package.json..."
  echo '{
    "name": "vite_react_shadcn_ts",
    "private": true,
    "version": "0.0.0",
    "type": "module",
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "start": "vite"
    }
  }' > package.json
fi

# Add executable permission to NPX
chmod +x $(which npx) 2>/dev/null || echo "Could not set permission on npx, you might need sudo"

# Run node script to fix package.json
node fix-package.js

# Install all dependencies
echo "Installing dependencies..."
npm install

# Add Vite to PATH
export PATH="$PATH:$(npm bin)"
export PATH="$PATH:$(npm config get prefix)/bin"
export PATH="$PATH:./node_modules/.bin"

echo "Setup completed! Run ./start-app.sh to start your application."
