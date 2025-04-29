
#!/bin/bash

echo "📦 Installing project dependencies..."

# Install core dependencies
npm install react-router-dom sonner zod react-hook-form @hookform/resolvers date-fns

# Install dev dependencies
npm install --save-dev vite @vitejs/plugin-react-swc typescript

# Create a utility file for polyfills and icons
mkdir -p src/utils
