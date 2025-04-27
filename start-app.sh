
#!/bin/bash

# Make scripts executable
chmod +x fix-all-imports.sh

# Add npm bin directories to PATH
export PATH="$PATH:$(npm bin)"
export PATH="$PATH:$(npm config get prefix)/bin"
export PATH="$PATH:./node_modules/.bin"

# Make sure we have dependencies installed
npm install --no-save vite lucide-react react-router-dom sonner recharts date-fns zod

# Fix imports
./fix-all-imports.sh

# Print the PATH for debugging
echo "Current PATH: $PATH"

# Show where vite is installed
echo "Vite location: $(which vite || echo 'Not found')"

# Start the development server with the full path to vite
./node_modules/.bin/vite || $(npm bin)/vite || npx vite
