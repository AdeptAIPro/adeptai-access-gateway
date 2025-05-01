
#!/bin/bash

# Add npm bin directories to PATH
export PATH="$PATH:$(npm bin)"
export PATH="$PATH:$(npm config get prefix)/bin"
export PATH="$PATH:./node_modules/.bin"

# Install Vite if not available
if ! npm list vite >/dev/null 2>&1; then
  echo "📦 Installing Vite..."
  npm install --save-dev vite@latest @vitejs/plugin-react-swc
fi

# Run Vite
echo "🚀 Starting Vite development server..."
npx vite
