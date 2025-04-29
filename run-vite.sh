
#!/bin/bash

# Make the script executable
chmod +x run-vite.sh

# Set up PATH to include node_modules/.bin
export PATH="$PATH:$(npm bin)"
export PATH="$PATH:$(npm config get prefix)/bin"
export PATH="$PATH:./node_modules/.bin"
export PATH="$PATH:$HOME/.npm/bin"

# Make sure Vite is installed
echo "Checking for vite installation..."
if ! npm list vite --depth=0 &> /dev/null; then
  echo "Installing vite and required dependencies..."
  npm install --save-dev vite@latest @vitejs/plugin-react-swc
fi

# Ensure it's properly installed
if ! npm list vite --depth=0 &> /dev/null; then
  echo "❌ Failed to install Vite through npm list check. Direct installation..."
  npm install --save-dev vite --force
fi

# Check multiple ways to find and run Vite
if [ -f "./node_modules/.bin/vite" ]; then
  echo "Running local Vite from ./node_modules/.bin/vite"
  ./node_modules/.bin/vite
elif command -v npx &> /dev/null; then
  echo "Running Vite with npx"
  npx vite
elif command -v vite &> /dev/null; then
  echo "Running global Vite"
  vite
else
  echo "❌ Vite not found! Installing it now as a last resort..."
  npm install --save-dev vite@latest @vitejs/plugin-react-swc
  npm install --global vite
  
  # Try running with npx after installation
  if command -v npx &> /dev/null; then
    npx vite
  elif command -v vite &> /dev/null; then
    vite
  else
    # Last resort - try using node to run vite directly
    echo "Attempting to run Vite directly through Node..."
    node ./node_modules/vite/bin/vite.js
  fi
fi
