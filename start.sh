
#!/bin/bash

echo "🚀 Starting the lovable project..."

# Update browserslist database first
echo "🔄 Updating browserslist database..."
npx update-browserslist-db@latest

# Make this script executable
chmod +x start.sh

# Make other scripts executable
chmod +x start-dev.sh
chmod +x setup-and-run.sh

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Add missing dependency for React Query
if ! npm list @tanstack/react-query >/dev/null 2>&1; then
  echo "📦 Installing React Query..."
  npm install @tanstack/react-query
fi

# Ensure Vite is installed
if ! npm list vite >/dev/null 2>&1; then
  echo "📦 Installing Vite..."
  npm install vite
fi

# Run the project
echo "🚀 Starting the development server..."
npx vite
