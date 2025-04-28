
#!/bin/bash

echo "🚀 Starting comprehensive cleanup and setup..."

# Clean directories
echo "🧹 Cleaning up previous builds..."
rm -rf node_modules/.vite
rm -rf dist

# Add execution permission to all scripts
echo "📝 Making all scripts executable..."
find . -name "*.sh" -exec chmod +x {} \;

# Install required dependencies
echo "📦 Installing essential dependencies..."
npm install --no-save vite@latest react-router-dom lucide-react sonner recharts date-fns zod --silent

# Make start-dev.sh executable
chmod +x ./start-dev.sh

# Let's fix the EmployeeService.ts to export addEmployee
echo "🔧 Adding missing exports to EmployeeService..."
cat > temp_fix.js <<EOL
const fs = require('fs');
const path = require('path');

// Fix EmployeeService.ts to ensure addEmployee is properly exported
const employeeServicePath = path.join(__dirname, 'src/services/payroll/EmployeeService.ts');
if (fs.existsSync(employeeServicePath)) {
  let content = fs.readFileSync(employeeServicePath, 'utf8');
  if (!content.includes('export const addEmployee = createEmployee')) {
    content += "\n// Add the missing function that's imported in use-payroll-supabase.ts\nexport const addEmployee = createEmployee;\n";
    fs.writeFileSync(employeeServicePath, content);
    console.log("✅ Fixed addEmployee export in EmployeeService.ts");
  }
}
EOL

node temp_fix.js
rm temp_fix.js

# Add npm bin directories to PATH
export PATH="$PATH:$(npm bin)"
export PATH="$PATH:$(npm config get prefix)/bin"
export PATH="$PATH:./node_modules/.bin"

# Check Vite installation
if command -v ./node_modules/.bin/vite &> /dev/null; then
  echo "✅ Vite found in node_modules."
  VITE_PATH="./node_modules/.bin/vite"
elif command -v npx &> /dev/null; then
  echo "✅ Using npx to run Vite."
  VITE_PATH="npx vite"
else
  echo "⚠️ No direct path to Vite found, will try npm run."
  VITE_PATH="npm run dev"
fi

# Create a basic vite.config.js if one doesn't exist
if [ ! -f "vite.config.js" ] && [ ! -f "vite.config.ts" ]; then
  echo "📝 Creating basic vite.config.js..."
  cat > vite.config.js <<EOL
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
EOL
  echo "✅ Created vite.config.js"
fi

# Let's make sure we have a basic index.html if it doesn't exist
if [ ! -f "index.html" ]; then
  echo "📝 Creating basic index.html..."
  cat > index.html <<EOL
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOL
  echo "✅ Created index.html"
fi

# Update start-dev.sh to ensure it handles Vite properly
cat > start-dev.sh <<EOL
#!/bin/bash

# Clear any previous issues
echo "Cleaning up previous builds..."
rm -rf node_modules/.vite
rm -rf dist

# Install Vite if not available
if ! command -v ./node_modules/.bin/vite &> /dev/null; then
  echo "Installing Vite locally..."
  npm install --no-save vite@latest --silent
fi

# Add npm bin directories to PATH
export PATH="\$PATH:\$(npm bin)"
export PATH="\$PATH:\$(npm config get prefix)/bin"
export PATH="\$PATH:./node_modules/.bin"

echo "Starting development server..."
# Try multiple ways to start vite
if [ -f "./node_modules/.bin/vite" ]; then
  echo "Using local vite from node_modules..."
  ./node_modules/.bin/vite
elif command -v npx &> /dev/null; then
  echo "Using npx to run vite..."
  npx vite
else
  echo "Trying npm run to run vite..."
  npm run dev
fi
EOL

chmod +x start-dev.sh
echo "✅ Updated start-dev.sh"

echo "🚀 Starting development server using: $VITE_PATH"
$VITE_PATH

# Fallback if the above fails
if [ $? -ne 0 ]; then
  echo "⚠️ Failed to start with primary method, trying alternate approaches..."
  npx vite || ./node_modules/.bin/vite || npm run dev
fi
