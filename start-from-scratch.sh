
#!/bin/bash

# Make script executable
chmod +x ./start-dev.sh

echo "🔧 Starting comprehensive cleanup and setup..."

# Clean directories
echo "🧹 Cleaning up previous builds..."
rm -rf node_modules/.vite
rm -rf dist

# Add execution permission to all scripts
echo "📝 Making all scripts executable..."
find . -name "*.sh" -exec chmod +x {} \;

# Install required dependencies
echo "📦 Installing essential dependencies..."
npm install --no-save vite@latest lucide-react react-router-dom sonner recharts date-fns zod --silent

# Add npm bin directories to PATH
export PATH="$PATH:$(npm bin)"
export PATH="$PATH:$(npm config get prefix)/bin"
export PATH="$PATH:./node_modules/.bin"

# Check Vite installation
if command -v ./node_modules/.bin/vite &> /dev/null; then
  echo "✅ Vite found in node_modules."
  VITE_PATH="./node_modules/.bin/vite"
elif command -v npx &> /dev/null; then
  echo "✅ Using npx to run Vite."
  VITE_PATH="npx vite"
else
  echo "⚠️ No direct path to Vite found, will try npm run."
  VITE_PATH="npm run dev"
fi

echo "🚀 Starting development server using: $VITE_PATH"
$VITE_PATH

# Fallback if the above fails
if [ $? -ne 0 ]; then
  echo "⚠️ Failed to start with primary method, trying alternate approaches..."
  npx vite || ./node_modules/.bin/vite || npm run dev
fi
