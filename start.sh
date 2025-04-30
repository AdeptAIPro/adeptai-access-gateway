
#!/bin/bash

echo "🚀 Starting the lovable project..."

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

# Run the project
echo "🚀 Starting the development server..."
npm run dev
