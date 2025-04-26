
#!/bin/bash

# Install required dependencies
npm install --save react-router-dom lucide-react sonner recharts date-fns zod
npm install --save-dev vite @vitejs/plugin-react-swc

# Create directories if they don't exist
mkdir -p src/utils

# Ensure vite is installed globally
echo "Installing vite globally..."
npm install -g vite
npm install -g @vitejs/plugin-react-swc

# Set executable permissions for vite
chmod +x $(npm bin)/vite

# Add vite to PATH if it's not already there
export PATH="$PATH:$(npm bin)"

# Optional: Add helpful message
echo "Dependencies installed successfully!"
echo "You can now run the development server with: npm run dev"
