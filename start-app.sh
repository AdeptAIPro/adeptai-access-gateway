
#!/bin/bash

echo "🚀 Starting comprehensive setup and application launch..."

# Make all scripts executable
chmod +x setup-and-run.sh
chmod +x run-vite.sh
chmod +x fix-package.js
chmod +x fix-imports.js
chmod +x make-executable.sh
[ -f "start-dev.sh" ] && chmod +x start-dev.sh
[ -f "ensure-vite.sh" ] && chmod +x ensure-vite.sh
[ -f "fix-all-issues.sh" ] && chmod +x fix-all-issues.sh
[ -f "check-deps.sh" ] && chmod +x check-deps.sh

# Clean npm cache to prevent issues
echo "🧹 Cleaning npm cache..."
npm cache clean --force

# Install essential dependencies
echo "📦 Installing core dependencies..."
npm install --save-dev vite@latest @vitejs/plugin-react-swc typescript
npm install --save react-router-dom sonner zod react-hook-form @hookform/resolvers

# Run fix-package.js to configure package.json
echo "📋 Configuring package.json..."
node fix-package.js

# Add npm bin directories to PATH
export PATH="$PATH:$(npm bin)"
export PATH="$PATH:$(npm config get prefix)/bin"
export PATH="$PATH:./node_modules/.bin"
export PATH="$PATH:$HOME/.npm/bin"

# Clear any previous issues
echo "🧹 Cleaning up previous builds..."
rm -rf node_modules/.vite
rm -rf dist

# Create a .env file if it doesn't exist
if [ ! -f ".env" ]; then
  echo "Creating .env file..."
  echo "VITE_API_GATEWAY_BASE_URL=https://api.adeptaipro.com" > .env
  echo "VITE_AWS_REGION=us-east-1" >> .env
  echo "VITE_MULTI_TENANCY_ENABLED=true" >> .env
fi

# Multiple attempts to start Vite
echo "🚀 Starting application..."

# Method 1: Try using local vite in node_modules
if [ -f "./node_modules/.bin/vite" ]; then
  echo "Using Vite from ./node_modules/.bin/vite"
  ./node_modules/.bin/vite
  exit_code=$?
  if [ $exit_code -eq 0 ]; then exit 0; fi
  echo "Failed with exit code: $exit_code, trying next method..."
fi

# Method 2: Try using npx
echo "Using npx to run Vite..."
npx vite
exit_code=$?
if [ $exit_code -eq 0 ]; then exit 0; fi
echo "Failed with exit code: $exit_code, trying next method..."

# Method 3: Try using direct global vite
if command -v vite &> /dev/null; then
  echo "Using globally installed Vite..."
  vite
  exit_code=$?
  if [ $exit_code -eq 0 ]; then exit 0; fi
  echo "Failed with exit code: $exit_code, trying next method..."
fi

# Method 4: Try npm run dev
echo "Running via npm run dev..."
npm run dev
exit_code=$?
if [ $exit_code -eq 0 ]; then exit 0; fi
echo "Failed with exit code: $exit_code, trying last method..."

# Last resort: Try direct node access to vite
echo "Trying direct node access to Vite..."
node ./node_modules/vite/bin/vite.js

# If we get here, all methods failed
echo "❌ All methods to start Vite failed. Please try the manual steps below:"
echo "1. Run: npm install --save-dev vite @vitejs/plugin-react-swc"
echo "2. Run: export PATH=\$PATH:./node_modules/.bin"
echo "3. Run: npx vite"
echo "4. If that fails, try: npm install -g vite && vite"
