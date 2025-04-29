
#!/bin/bash

echo "🔧 Making scripts executable..."

# Make all shell scripts executable
find . -name "*.sh" -type f -exec chmod +x {} \;

echo "✅ All scripts are now executable!"
