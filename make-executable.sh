
#!/bin/bash

# Make all scripts executable
chmod +x run-vite.sh
chmod +x fix-package.js
chmod +x setup-and-run.sh
chmod +x make-executable.sh
chmod +x start-dev.sh
[ -f "fix-all-issues.sh" ] && chmod +x fix-all-issues.sh
[ -f "fix-all-imports.sh" ] && chmod +x fix-all-imports.sh
[ -f "fix-imports.js" ] && chmod +x fix-imports.js
[ -f "ensure-vite.sh" ] && chmod +x ensure-vite.sh
[ -f "start-app.sh" ] && chmod +x start-app.sh

# Make node scripts executable
find . -name "*.js" -not -path "./node_modules/*" -exec chmod +x {} \;

echo "✅ All scripts are now executable"

# Verify Vite installation
if command -v npx &> /dev/null; then
  echo "Checking for Vite with npx..."
  npx vite --version || echo "Vite not found via npx, will install in setup-and-run.sh"
else
  echo "npx not available, will try direct installation in setup-and-run.sh"
fi
