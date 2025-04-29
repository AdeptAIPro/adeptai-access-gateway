
#!/bin/bash

# Make scripts executable
chmod +x run-vite.sh
chmod +x fix-package.js

# Run fix-package.js to ensure package.json is correctly configured
echo "📋 Configuring package.json..."
node fix-package.js

# Install core dependencies
echo "📦 Installing dependencies..."
npm install --save-dev vite@latest @vitejs/plugin-react-swc typescript
npm install --save react-router-dom sonner zod react-hook-form @hookform/resolvers

# Add npm bin directories to PATH
export PATH="$PATH:$(npm bin)"
export PATH="$PATH:$(npm config get prefix)/bin"
export PATH="$PATH:./node_modules/.bin"
export PATH="$PATH:$HOME/.npm/bin"

# Run vite
echo "🚀 Starting development server..."
./run-vite.sh
