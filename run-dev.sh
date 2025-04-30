
#!/bin/bash

# Make this script executable
chmod +x run-dev.sh

# Install required dependencies if missing
echo "📦 Installing required dependencies..."
npm install --save react react-dom react-router-dom sonner date-fns zod lucide-react
npm install --save-dev @types/react @types/react-dom typescript

# Run the Vite server
echo "🚀 Starting development server..."
export PATH="$PATH:$(npm bin)"
if [ -f "./node_modules/.bin/vite" ]; then
  echo "Using local Vite installation"
  ./node_modules/.bin/vite
elif command -v npx &> /dev/null; then
  echo "Using npx to run Vite"
  npx vite
else
  echo "Trying with npm run dev"
  npm run dev
fi
