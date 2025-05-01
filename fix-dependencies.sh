
#!/bin/bash

echo "🚀 Installing required dependencies..."

# Install core dependencies
npm install --save react react-dom react-router-dom sonner zod date-fns
npm install --save-dev @types/react @types/react-dom typescript

# Install UI dependencies
npm install --save lucide-react class-variance-authority clsx tailwind-merge @radix-ui/react-slot

# Install Vite dependencies
npm install --save-dev vite @vitejs/plugin-react-swc

# Install React Hook Form and validators
npm install --save react-hook-form @hookform/resolvers

# Add executable permissions to run scripts
chmod +x run-vite.sh
chmod +x setup-and-run-vite.sh

# Run Vite
echo "🚀 Starting Vite development server..."
npx vite

