
#!/bin/bash

echo "🔧 Making scripts executable..."

# Make all scripts executable
chmod +x setup-vite.sh
chmod +x run-dev.sh
chmod +x start.sh
chmod +x start-app.sh
chmod +x fix-deps-and-run.sh
chmod +x make-executable.sh

echo "✅ All scripts are now executable!"
echo "🚀 Run ./fix-deps-and-run.sh to install dependencies and start the application."
