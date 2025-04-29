
#!/bin/bash

echo "🔧 Fixing NODE_PATH environment variable..."

# Add node_modules/.bin to PATH
export PATH="$PATH:$(npm bin)"
export PATH="$PATH:$(npm config get prefix)/bin"
export PATH="$PATH:./node_modules/.bin"

# Create a helper script that can be sourced
cat > set-node-path.sh << 'EOL'
#!/bin/bash
export PATH="$PATH:$(npm bin)"
export PATH="$PATH:$(npm config get prefix)/bin"
export PATH="$PATH:./node_modules/.bin"
echo "NODE_PATH has been updated. You can now run vite directly."
EOL

chmod +x set-node-path.sh

echo "✅ NODE_PATH fix complete!"
echo "To apply the fix in your current terminal, run: source ./set-node-path.sh"
