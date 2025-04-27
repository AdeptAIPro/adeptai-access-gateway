
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
npm install -g npm@latest

# Install Vite globally
npm install -g vite

# Run the setup
./setup.sh

# Fix all imports
./fix-all-imports.sh

# Create a simple package.json if it doesn't exist
if [ ! -f "package.json" ]; then
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
  
  echo "Created package.json file"
fi

# Run node script to fix package.json
node fix-package.js

# Install all dependencies
npm install

echo "Setup completed! Run ./start-app.sh to start your application."
