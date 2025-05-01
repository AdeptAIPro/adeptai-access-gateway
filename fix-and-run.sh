
#!/bin/bash

# Make this script executable
chmod +x fix-and-run.sh

# Make other scripts executable
chmod +x start-dev.sh
chmod +x run-vite.sh
chmod +x fix-dependencies.sh
chmod +x setup-and-run-vite.sh
chmod +x init.sh
[ -f "make-fix-executable.sh" ] && chmod +x make-fix-executable.sh
[ -f "scripts/fix-imports.js" ] && chmod +x scripts/fix-imports.js

echo "🔧 All scripts are now executable..."

# Run the fix-imports script to fix any problematic imports
echo "🔍 Running fix-imports script..."
node scripts/fix-imports.js

# Install required dependencies
echo "📦 Installing required dependencies..."
npm install --save react react-dom react-router-dom sonner date-fns zod lucide-react
npm install --save class-variance-authority tailwind-merge clsx
npm install --save-dev @types/react @types/react-dom typescript

echo "🚀 Now running start-dev.sh to set up dependencies and start Vite..."
./start-dev.sh
