
#!/bin/bash

echo "🔧 Starting comprehensive fixes for build errors..."

# Make scripts executable
chmod +x setup-dependencies.sh
chmod +x run-fix-imports.sh
chmod +x start-dev.sh

# Run the setup dependencies script
echo "📦 Installing dependencies..."
./setup-dependencies.sh

# Run the fix imports script
echo "🔧 Fixing import issues..."
./run-fix-imports.sh

# Start the development server
echo "🚀 Starting development server..."
./start-dev.sh
