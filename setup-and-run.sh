
#!/bin/bash

# Make scripts executable
chmod +x run-vite.sh
chmod +x fix-package.js
chmod +x fix-imports.js

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

# Ensure Vite is available by checking for it
if [ ! -f "./node_modules/.bin/vite" ]; then
  echo "Vite not found in node_modules, installing it directly..."
  npm install --save-dev vite
fi

# Verify vite is now available
if [ -f "./node_modules/.bin/vite" ]; then
  echo "🚀 Starting development server with local Vite..."
  ./node_modules/.bin/vite
elif command -v npx &> /dev/null; then
  echo "🚀 Starting development server with npx Vite..."
  npx vite
else
  echo "❌ Error: Vite is still not available. Installing globally as a last resort..."
  npm install -g vite
  echo "🚀 Trying global Vite installation..."
  vite
fi
