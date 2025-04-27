
#!/bin/bash

# Install required dependencies
npm install --save react-router-dom lucide-react sonner recharts date-fns zod
npm install --save-dev vite @vitejs/plugin-react-swc

# Create directories if they don't exist
mkdir -p src/utils

# Install Vite globally if not already installed
if ! command -v vite &> /dev/null; then
  echo "Installing Vite globally..."
  npm install -g vite @vitejs/plugin-react-swc --force
fi

# Set executable permissions for vite
if [ -f "$(npm bin)/vite" ]; then
  chmod +x "$(npm bin)/vite"
fi

# Add npm bin directory to PATH in current session
export PATH="$PATH:$(npm bin)"

# Add npm bin directory to PATH permanently (if not already there)
if ! grep -q 'export PATH="$PATH:$(npm bin)"' ~/.bashrc; then
  echo 'export PATH="$PATH:$(npm bin)"' >> ~/.bashrc
fi

if ! grep -q 'export PATH="$PATH:$(npm bin)"' ~/.profile; then
  echo 'export PATH="$PATH:$(npm bin)"' >> ~/.profile
fi

# Create a helper script that ensures vite is in PATH
cat > start-app.sh << 'EOF'
#!/bin/bash
export PATH="$PATH:$(npm bin)"
export PATH="$PATH:$(npm config get prefix)/bin"
if ! command -v vite &> /dev/null; then
  echo "Vite not found in PATH, trying to run with npx..."
  npx vite
else
  vite
fi
EOF

chmod +x start-app.sh

# Update package.json scripts to use npx for vite
npm pkg set "scripts.dev=npx vite"
npm pkg set "scripts.build=npx vite build"
npm pkg set "scripts.start=npx vite"

# Create symbolic link if npm bin is not in PATH
if [ -d "$(npm config get prefix)/bin" ]; then
  if [ ! -f "$(npm config get prefix)/bin/vite" ] && [ -f "$(npm bin)/vite" ]; then
    ln -sf "$(npm bin)/vite" "$(npm config get prefix)/bin/vite"
  fi
fi

echo "Dependencies installed successfully!"
echo "You can now run the development server with one of these commands:"
echo "  1. npm run dev"
echo "  2. ./start-app.sh"
echo "  3. npx vite"
