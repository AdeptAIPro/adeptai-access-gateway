
#!/bin/bash

# Make script executable
chmod +x ./start-app.sh

# Clear any previous issues
echo "Cleaning up previous builds..."
rm -rf node_modules/.vite
rm -rf dist

# Install vite if needed
if ! command -v vite &> /dev/null; then
  echo "Installing Vite globally..."
  npm install -g vite
fi

# Make sure we have all dependencies
echo "Ensuring all dependencies are installed..."
npm install --silent

# Add npm bin directories to PATH
export PATH="$PATH:$(npm bin)"
export PATH="$PATH:$(npm config get prefix)/bin"
export PATH="$PATH:./node_modules/.bin"

echo "Starting development server..."
# Try multiple ways to start vite
npx vite || node_modules/.bin/vite || npm run dev

if [ $? -ne 0 ]; then
  echo "Failed to start with npx or direct path. Trying with npm run..."
  npm run dev
fi
