
#!/bin/bash

# Install required dependencies
npm install --save react-router-dom lucide-react sonner recharts date-fns zod
npm install --save-dev vite @vitejs/plugin-react-swc

# Create directories if they don't exist
mkdir -p src/utils

# Install Vite globally with sudo if needed
echo "Installing Vite globally..."
npm install -g vite || sudo npm install -g vite
npm install -g @vitejs/plugin-react-swc || sudo npm install -g @vitejs/plugin-react-swc

# Set executable permissions for vite
chmod +x $(npm bin)/vite

# Add npm bin directory to PATH
export PATH="$PATH:$(npm bin)"
echo 'export PATH="$PATH:$(npm bin)"' >> ~/.bashrc
echo 'export PATH="$PATH:$(npm bin)"' >> ~/.profile

# Create a helper script to start the application that ensures vite is in PATH
cat > start-app.sh << 'EOF'
#!/bin/bash
export PATH="$PATH:$(npm bin)"
if ! command -v vite &> /dev/null; then
  echo "Vite not found, trying to run with npx..."
  npx vite
else
  vite
fi
EOF

chmod +x start-app.sh

# Update package.json scripts to use npx for vite
npm pkg set "scripts.dev=npx vite"
npm pkg set "scripts.build=npx vite build"

# Optional: Add helpful message
echo "Dependencies installed successfully!"
echo "You can now run the development server with:"
echo "  1. npm run dev"
echo "  2. ./start-app.sh"
echo "  3. npx vite"
