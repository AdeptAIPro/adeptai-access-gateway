
#!/bin/bash

# Make this script executable
chmod +x fix-and-run.sh

# Make other scripts executable
chmod +x start-dev.sh
chmod +x run-vite.sh
[ -f "setup-and-run-vite.sh" ] && chmod +x setup-and-run-vite.sh
[ -f "init.sh" ] && chmod +x init.sh

echo "🔧 All scripts are now executable..."

# Run the fix-imports script to fix any problematic imports
echo "🔍 Running fix-imports script..."
node src/utils/fix-imports.js || true

# Update browserslist database
echo "🔄 Updating browserslist database..."
npx update-browserslist-db@latest || true

# Install required dependencies
echo "📦 Installing required dependencies..."
npm install --save react react-dom react-router-dom sonner date-fns zod lucide-react lovable-tagger
npm install --save-dev @types/react @types/react-dom typescript @vitejs/plugin-react-swc vite

# Ensure path includes node modules binaries
export PATH="$PATH:$(npm bin)"

# Create essential utility files if they don't exist
mkdir -p src/utils/icons

echo "🚀 Now running start-dev.sh to set up dependencies and start Vite..."
./start-dev.sh
