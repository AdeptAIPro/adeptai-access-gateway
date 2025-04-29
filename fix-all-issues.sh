
#!/bin/bash

echo "🔧 Starting comprehensive fixes for build errors..."

# Make all scripts executable
chmod +x fix-all-issues.sh
[ -f "start-dev.sh" ] && chmod +x start-dev.sh
[ -f "src/utils/fix-imports.js" ] && chmod +x src/utils/fix-imports.js
[ -f "check-deps.sh" ] && chmod +x check-deps.sh
[ -f "setup-and-run.sh" ] && chmod +x setup-and-run.sh
[ -f "make-executable.sh" ] && chmod +x make-executable.sh
[ -f "ensure-vite.sh" ] && chmod +x ensure-vite.sh
[ -f "run-vite.sh" ] && chmod +x run-vite.sh

# Create utility directories if they don't exist
mkdir -p src/utils
mkdir -p src/utils/icons
mkdir -p src/lib
mkdir -p src/services/aws/lambda

# Install core dependencies
echo "📦 Installing project dependencies..."
npm install --save react-router-dom sonner zod react-hook-form @hookform/resolvers date-fns uuid
npm install --save-dev vite@latest @vitejs/plugin-react-swc typescript @types/uuid @types/node
npm install --save aws-sdk @aws-sdk/client-s3 @aws-sdk/client-dynamodb @aws-sdk/util-dynamodb

# Create shadcn patches file if it doesn't exist
if [ ! -f "src/utils/shadcn-patches.tsx" ]; then
  echo "Creating shadcn-patches.tsx..."
  mkdir -p src/utils
  touch src/utils/shadcn-patches.tsx
fi

# Ensure Vite is properly installed
if [ ! -f "./node_modules/.bin/vite" ]; then
  echo "📦 Installing Vite locally..."
  npm install --save-dev vite@latest --force
fi

# Run the fix-imports script to fix import paths
if [ -f "src/utils/fix-imports.js" ]; then
  echo "🔧 Running import fixes..."
  node src/utils/fix-imports.js
fi

# Create a helper script to fix PATH issues with Vite
cat > run-vite.sh << 'EOL'
#!/bin/bash
export PATH="$PATH:$(npm bin)"
export PATH="$PATH:$(npm config get prefix)/bin"
export PATH="$PATH:./node_modules/.bin"

if [ -f "./node_modules/.bin/vite" ]; then
  echo "Running local Vite from ./node_modules/.bin/vite"
  ./node_modules/.bin/vite "$@"
elif command -v npx &> /dev/null; then
  echo "Running Vite with npx"
  npx vite "$@"
else
  echo "❌ Vite not found! Please install it with: npm install --save-dev vite"
  exit 1
fi
EOL

chmod +x run-vite.sh

# Create AWS service architecture directory structure
mkdir -p src/services/aws/lambda
mkdir -p src/services/aws/dynamodb
mkdir -p src/services/aws/s3

# Create AWS Lambda backend services
mkdir -p src/services/backend-api

echo "✅ All fixes have been applied!"
echo "🚀 You can now start the development server with: ./run-vite.sh"
