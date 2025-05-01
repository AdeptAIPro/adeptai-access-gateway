
#!/bin/bash

# Add npm bin directories to PATH
export PATH="$PATH:$(npm bin)"
export PATH="$PATH:$(npm config get prefix)/bin"
export PATH="$PATH:./node_modules/.bin"

# Run Vite
echo "🚀 Starting Vite development server..."
npx vite
