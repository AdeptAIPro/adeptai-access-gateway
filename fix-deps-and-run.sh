
#!/bin/bash

echo "🚀 Setting up project and fixing dependencies..."

# Make this script executable
chmod +x fix-deps-and-run.sh

# Make other scripts executable
chmod +x setup-vite.sh
chmod +x run-dev.sh
chmod +x start.sh
chmod +x start-app.sh

# Run setup-vite.sh first to prepare the environment
echo "🔧 Running setup-vite.sh..."
./setup-vite.sh

# Install required dependencies if they're missing
echo "📦 Installing required dependencies..."
npm install --save react react-dom react-router-dom sonner date-fns zod lucide-react
npm install --save-dev @types/react @types/react-dom typescript

# Run the development server
echo "🚀 Starting development server with run-dev.sh..."
./run-dev.sh
