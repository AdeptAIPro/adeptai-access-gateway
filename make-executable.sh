
#!/bin/bash

echo "🔧 Making all scripts executable..."

# Find and make all shell scripts executable
find . -name "*.sh" -type f -exec chmod +x {} \;

# Make specific scripts executable
chmod +x run-vite.sh 2>/dev/null || true
chmod +x fix-package.js 2>/dev/null || true
chmod +x setup-and-run.sh 2>/dev/null || true
chmod +x make-executable.sh 2>/dev/null || true
chmod +x start-dev.sh 2>/dev/null || true
chmod +x fix-all-issues.sh 2>/dev/null || true
chmod +x fix-all-imports.sh 2>/dev/null || true
chmod +x fix-imports.js 2>/dev/null || true
chmod +x ensure-vite.sh 2>/dev/null || true
chmod +x start-app.sh 2>/dev/null || true
chmod +x check-deps.sh 2>/dev/null || true
chmod +x deploy-aws.sh 2>/dev/null || true

# Make node scripts executable
find . -name "*.js" -not -path "./node_modules/*" -exec chmod +x {} \; 2>/dev/null || true

echo "✅ All scripts are now executable"

# Add node_modules/.bin to PATH
export PATH="$PATH:$(npm bin)"
export PATH="$PATH:$(npm config get prefix)/bin"
export PATH="$PATH:./node_modules/.bin"

# Install Vite if not already installed
if ! npm list vite --depth=0 &> /dev/null; then
  echo "Installing vite and required dependencies..."
  npm install --save-dev vite@latest @vitejs/plugin-react-swc @types/node
fi

# Make sure vite is in node_modules and is executable
if [ ! -f "./node_modules/.bin/vite" ]; then
  echo "Reinstalling Vite locally..."
  npm install --save-dev vite@latest
  chmod +x ./node_modules/.bin/vite 2>/dev/null || true
fi

# Install AWS SDK dependencies
if ! npm list @aws-sdk/client-s3 --depth=0 &> /dev/null; then
  echo "Installing AWS SDK dependencies..."
  npm install --save @aws-sdk/client-s3 @aws-sdk/client-dynamodb @aws-sdk/util-dynamodb uuid
fi

# Verify Vite installation
if command -v npx &> /dev/null; then
  echo "Checking for Vite with npx..."
  npx vite --version || echo "Vite not found via npx, will install in start-app.sh"
else
  echo "npx not available, will try direct installation in start-app.sh"
fi

# Create a helper script for running vite directly
cat > run-vite.sh << 'EOL'
#!/bin/bash

# Set up PATH to include node_modules/.bin
export PATH="$PATH:$(npm bin)"
export PATH="$PATH:$(npm config get prefix)/bin"
export PATH="$PATH:./node_modules/.bin"

# Try multiple ways to run vite
if [ -f "./node_modules/.bin/vite" ]; then
  echo "Running with local vite..."
  ./node_modules/.bin/vite
elif command -v npx &> /dev/null; then
  echo "Running with npx vite..."
  npx vite
elif command -v vite &> /dev/null; then
  echo "Running with global vite..."
  vite
else
  echo "Direct access to node_modules..."
  node ./node_modules/vite/bin/vite.js
fi
EOL

chmod +x run-vite.sh

echo "✅ Run './start-app.sh' to start the application"
