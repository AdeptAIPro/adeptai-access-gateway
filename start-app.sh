
#!/bin/bash

echo "🚀 Starting comprehensive setup and application launch..."

# Make all scripts executable
chmod +x setup-and-run.sh 2>/dev/null || true
chmod +x run-vite.sh 2>/dev/null || true
chmod +x fix-package.js 2>/dev/null || true
chmod +x fix-imports.js 2>/dev/null || true
chmod +x make-executable.sh 2>/dev/null || true
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

# Install AWS SDK dependencies
echo "📦 Installing AWS SDK dependencies..."
npm install --save @aws-sdk/client-s3 @aws-sdk/client-dynamodb @aws-sdk/util-dynamodb uuid

# Run fix-package.js to configure package.json
echo "📋 Configuring package.json..."
node fix-package.js 2>/dev/null || true

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

# Set up TypeScript if needed
if [ ! -f "tsconfig.json" ]; then
  echo "Setting up TypeScript configuration..."
  npx tsc --init --jsx react
fi

# Find vite binary - try multiple locations
VITE_PATH=$(which vite 2>/dev/null || true)
if [ -z "$VITE_PATH" ]; then
  VITE_PATH="./node_modules/.bin/vite"
  if [ ! -f "$VITE_PATH" ]; then
    echo "Vite not found in PATH or node_modules. Installing..."
    npm install --save-dev vite@latest @vitejs/plugin-react-swc
    VITE_PATH="./node_modules/.bin/vite"
  fi
fi

# Make sure vite is in node_modules and is executable
if [ ! -f "./node_modules/.bin/vite" ]; then
  echo "Reinstalling Vite locally..."
  npm install --save-dev vite@latest
  chmod +x ./node_modules/.bin/vite 2>/dev/null || true
fi

# Multiple attempts to start Vite
echo "🚀 Starting application with $VITE_PATH..."

# Method 1: Try using npx
echo "Using npx to run Vite..."
npx vite
exit_code=$?
if [ $exit_code -eq 0 ]; then exit 0; fi
echo "Failed with exit code: $exit_code, trying next method..."

# Method 2: Try using direct node execution 
echo "Using direct Node execution of Vite..."
node ./node_modules/vite/bin/vite.js
exit_code=$?
if [ $exit_code -eq 0 ]; then exit 0; fi
echo "Failed with exit code: $exit_code, trying next method..."

# Method 3: Try using local vite in node_modules with explicit path
if [ -f "./node_modules/.bin/vite" ]; then
  echo "Using Vite from ./node_modules/.bin/vite"
  ./node_modules/.bin/vite
  exit_code=$?
  if [ $exit_code -eq 0 ]; then exit 0; fi
  echo "Failed with exit code: $exit_code, trying next method..."
fi

# Method 4: Try using global vite
if command -v vite &> /dev/null; then
  echo "Using globally installed Vite..."
  vite
  exit_code=$?
  if [ $exit_code -eq 0 ]; then exit 0; fi
  echo "Failed with exit code: $exit_code, trying next method..."
fi

# Method 5: Try npm run dev
echo "Running via npm run dev..."
npm run dev
exit_code=$?
if [ $exit_code -eq 0 ]; then exit 0; fi
echo "Failed with exit code: $exit_code, trying last method..."

# Last resort: Try with node directly without relying on PATH
echo "Trying direct node access to Vite..."
node -e "require('./node_modules/vite/bin/vite.js')"

# If we get here, all methods failed
echo "❌ All methods to start Vite failed. Please try the manual steps below:"
echo "1. Run: npm install --save-dev vite @vitejs/plugin-react-swc"
echo "2. Run: export PATH=\$PATH:./node_modules/.bin"
echo "3. Run: npx vite"
echo "4. If that fails, try: npm install -g vite && vite"
