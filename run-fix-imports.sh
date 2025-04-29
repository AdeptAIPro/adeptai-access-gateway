
#!/bin/bash

# Make sure Node.js is available
if ! command -v node &> /dev/null; then
  echo "❌ Node.js is not installed. Please install Node.js and try again."
  exit 1
fi

# Run the fix-imports script
echo "🔧 Running fix-imports script..."
node fix-imports.js

# Make the start-dev script executable
chmod +x start-dev.sh

echo "✅ Import fixes completed. Run ./start-dev.sh to start the application."
