
#!/bin/bash

echo "📋 Checking project dependencies..."

# List of required packages
required_packages=(
  "vite"
  "react-router-dom"
  "sonner"
  "zod"
  "react-hook-form"
  "@hookform/resolvers"
  "date-fns"
)

# Check each package
for package in "${required_packages[@]}"; do
  if npm list "$package" --depth=0 >/dev/null 2>&1; then
    echo "✅ $package is installed"
  else
    echo "❌ $package is missing, installing..."
    npm install "$package"
  fi
done

# Check for Vite executable
if [ -f "./node_modules/.bin/vite" ]; then
  echo "✅ Vite executable found"
else
  echo "❌ Vite executable missing, reinstalling..."
  npm install --save-dev vite@latest --force
fi

echo "📋 Dependency check complete!"
