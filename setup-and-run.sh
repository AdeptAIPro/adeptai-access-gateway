
#!/bin/bash

# Install dependencies
npm install

# Create scripts directory if it doesn't exist
mkdir -p scripts

# Run the fix-imports script
echo "Running fix-imports script to fix lucide-react imports..."
node scripts/fix-imports.js

# Start the application
echo "Starting the application..."
npm run dev
