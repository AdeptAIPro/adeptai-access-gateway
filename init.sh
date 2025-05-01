
#!/bin/bash

# Make all scripts executable
chmod +x fix-dependencies.sh
chmod +x run-vite.sh
chmod +x setup-and-run-vite.sh

# Make fix-imports script executable
chmod +x src/utils/fix-imports.js

# Run the fix-imports script
echo "Running fix-imports script to fix problematic imports..."
node src/utils/fix-imports.js

# Display next steps
echo "✅ Setup complete! Please run ./fix-dependencies.sh to install dependencies and start the development server."

