
#!/bin/bash

# Install required dependencies
npm install --save react-router-dom lucide-react sonner recharts date-fns zod
npm install --save-dev vite @vitejs/plugin-react-swc

# Create directories if they don't exist
mkdir -p src/utils

# Ensure vite is installed globally and locally
echo "Installing vite globally and locally..."
npm install -g vite
npm install vite --save-dev
npm install -g @vitejs/plugin-react-swc
npm install @vitejs/plugin-react-swc --save-dev

# Set executable permissions for vite
chmod +x $(npm bin)/vite

# Add vite to PATH if it's not already there
if ! command -v vite &> /dev/null; then
  echo "Adding npm bin directory to PATH"
  export PATH="$PATH:$(npm bin)"
  echo 'export PATH="$PATH:$(npm bin)"' >> ~/.bashrc
  echo 'export PATH="$PATH:$(npm bin)"' >> ~/.profile
fi

# Verify vite is working
vite --version || echo "Warning: vite still not found in PATH. You may need to run 'npm exec vite' instead of just 'vite'."

# Create a helper script to start the application
echo '#!/bin/bash
export PATH="$PATH:$(npm bin)"
npm run dev
' > start-app.sh
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
