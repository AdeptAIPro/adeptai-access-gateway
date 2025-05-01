
#!/bin/bash

# Add npm bin directories to PATH
export PATH="$PATH:$(npm bin)"
export PATH="$PATH:$(npm config get prefix)/bin"
export PATH="$PATH:./node_modules/.bin"

# Ensure Vite is installed
if ! npm list vite >/dev/null 2>&1; then
  echo "📦 Installing Vite and other essential dependencies..."
  npm install --save-dev vite@latest @vitejs/plugin-react-swc lovable-tagger
  npm install --save zod sonner lucide-react
fi

# Run Vite 
echo "🚀 Starting Vite development server..."
if [ -f "./node_modules/.bin/vite" ]; then
  ./node_modules/.bin/vite
elif command -v npx &> /dev/null; then
  npx vite
else
  echo "❌ Error: Could not find Vite. Trying to install it globally and run..."
  npm install -g vite
  vite
fi
