
#!/bin/bash

# Make this script executable
chmod +x fix-and-run.sh

# Make other scripts executable
chmod +x start-dev.sh
chmod +x run-vite.sh
chmod +x fix-dependencies.sh
chmod +x setup-and-run-vite.sh
chmod +x init.sh
[ -f "make-fix-executable.sh" ] && chmod +x make-fix-executable.sh

echo "🔧 All scripts are now executable..."
echo "📦 Now running start-dev.sh to set up dependencies and start Vite..."
./start-dev.sh
