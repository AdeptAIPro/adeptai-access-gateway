
#!/bin/bash

# Install required dependencies
npm install --save react-router-dom lucide-react sonner recharts date-fns zod
npm install --save-dev vite @vitejs/plugin-react-swc

# Create directories if they don't exist
mkdir -p src/utils

# Ensure vite is installed globally
echo "Installing vite globally..."
npm install -g vite

# Optional: Add helpful message
echo "Dependencies installed successfully!"
echo "You can now run the development server with: npm run dev"
