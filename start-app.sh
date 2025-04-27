
#!/bin/bash

# Make scripts executable
chmod +x fix-all-imports.sh
chmod +x fix-package.js

# Add npm bin directories to PATH
export PATH="$PATH:$(npm bin)"
export PATH="$PATH:$(npm config get prefix)/bin"

# Make sure we have vite installed globally
npm install -g vite

# Also install local dependencies
npm install

# Fix imports
./fix-all-imports.sh

# Run the script to fix package.json
node fix-package.js

# Print the PATH for debugging
echo "Current PATH: $PATH"

# Show where vite is installed
echo "Vite location: $(which vite || echo 'Not found')"

# Start the development server with the full path
$(npm bin)/vite || $(npm config get prefix)/bin/vite || npx vite

