
#!/bin/bash

# Make sure we're in the project root
cd "$(dirname "$0")"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Run the package.json fix script
echo "Fixing package.json..."
node fix-package.js

# Fix imports in all TypeScript files
echo "Fixing imports in TypeScript files..."
node src/utils/fix-imports.js

# Install lucide-react and other missing dependencies
echo "Installing required dependencies..."
npm install --save lucide-react react-router-dom sonner recharts date-fns zod
npm install --save-dev vite @vitejs/plugin-react-swc typescript

# Clear node_modules cache and reinstall if needed
echo "Checking for Vite..."
if ! command -v vite &> /dev/null; then
  echo "Reinstalling Vite globally..."
  npm cache clean --force
  npm install -g vite @vitejs/plugin-react-swc
fi

# Make start-app.sh executable
chmod +x start-app.sh

echo "Fix completed! You can now run your app with: ./start-app.sh"
