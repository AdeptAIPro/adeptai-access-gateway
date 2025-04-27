
#!/bin/bash

# Install required dependencies
npm install --save react-router-dom lucide-react sonner recharts date-fns zod
npm install --save-dev vite @vitejs/plugin-react-swc typescript

# Create directories if they don't exist
mkdir -p src/utils

# Clear npm cache and reinstall Vite globally
npm cache clean --force
npm install -g vite @vitejs/plugin-react-swc

# Ensure executable permissions for vite
chmod +x $(npm bin)/vite

# Add npm bin directory to PATH
export PATH="$PATH:$(npm bin)"
export PATH="$PATH:$(npm config get prefix)/bin"

# Create a helper script that ensures vite is in PATH
cat > start-app.sh << 'EOF'
#!/bin/bash
export PATH="$PATH:$(npm bin)"
export PATH="$PATH:$(npm config get prefix)/bin"
npm run dev
EOF

chmod +x start-app.sh

# Update package.json scripts
npm pkg set "scripts.dev=vite"
npm pkg set "scripts.build=vite build"
npm pkg set "scripts.start=vite"

echo "Dependencies installed successfully!"
echo "You can now run the development server with: ./start-app.sh"
