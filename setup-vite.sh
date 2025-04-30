
#!/bin/bash

echo "🚀 Setting up Vite development environment..."

# Make this script executable
chmod +x setup-vite.sh

# Install TypeScript type definitions
npm install --save-dev @types/react @types/react-dom

# Install vite if not already installed
if ! npm list vite --depth=0 >/dev/null 2>&1; then
  echo "📦 Installing Vite..."
  npm install --save-dev vite
fi

# Create tsconfig.json if it doesn't exist or if it's read-only, create a new writable one
if [ ! -f "tsconfig.json" ] || [ ! -w "tsconfig.json" ]; then
  echo "Creating tsconfig.json..."
  cat > tsconfig.json.new << EOL
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOL

  if [ -f "tsconfig.json" ] && [ ! -w "tsconfig.json" ]; then
    echo "Warning: tsconfig.json exists but is read-only. Created tsconfig.json.new instead."
    echo "You may need to manually copy its contents or adjust permissions."
  else
    mv tsconfig.json.new tsconfig.json
  fi
fi

# Create tsconfig.node.json if it doesn't exist
if [ ! -f "tsconfig.node.json" ]; then
  echo "Creating tsconfig.node.json..."
  cat > tsconfig.node.json << EOL
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
EOL
fi

# Create a helper script to run vite with correct PATH
cat > run-vite.sh << EOL
#!/bin/bash

echo "🚀 Starting Vite development server..."

# Fix PATH to include node_modules/.bin
export PATH="\$PATH:\$(npm bin)"
export PATH="\$PATH:\$(npm config get prefix)/bin"
export PATH="\$PATH:./node_modules/.bin"
export PATH="\$PATH:\$HOME/.npm/bin"

# Use local Vite if available, otherwise use npx
if [ -f "./node_modules/.bin/vite" ]; then
  chmod +x ./node_modules/.bin/vite
  echo "Using local Vite installation"
  ./node_modules/.bin/vite
elif command -v npx &> /dev/null; then
  echo "Using npx to run Vite"
  npx vite
else
  echo "Trying with npm run dev"
  npm run dev
fi
EOL

# Make run-vite.sh executable
chmod +x run-vite.sh

echo "✅ Setup complete! Run ./run-vite.sh to start the development server."
