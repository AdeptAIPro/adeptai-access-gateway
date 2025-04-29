
#!/bin/bash

# Make the script executable
chmod +x run-vite.sh

# Set up PATH to include node_modules/.bin
export PATH="$PATH:$(npm bin)"
export PATH="$PATH:$(npm config get prefix)/bin"
export PATH="$PATH:./node_modules/.bin"
export PATH="$PATH:$HOME/.npm/bin"

# Check if vite is installed in node_modules
if [ -f "./node_modules/.bin/vite" ]; then
  echo "Running local Vite from ./node_modules/.bin/vite"
  ./node_modules/.bin/vite
elif command -v npx &> /dev/null; then
  echo "Running Vite with npx"
  npx vite
else
  echo "❌ Vite not found! Installing it now..."
  npm install --save-dev vite@latest @vitejs/plugin-react-swc
  
  # Try running with npx after installation
  if command -v npx &> /dev/null; then
    npx vite
  else
    # If npx is not available, try direct access
    ./node_modules/.bin/vite
  fi
fi
