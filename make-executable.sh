
#!/bin/bash

# Make all scripts executable
chmod +x run-vite.sh
chmod +x fix-package.js
chmod +x setup-and-run.sh
chmod +x make-executable.sh
if [ -f "fix-all-issues.sh" ]; then
  chmod +x fix-all-issues.sh
fi
if [ -f "fix-all-imports.sh" ]; then
  chmod +x fix-all-imports.sh
fi

echo "✅ All scripts are now executable"
