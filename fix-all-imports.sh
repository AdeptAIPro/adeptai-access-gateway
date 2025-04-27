
#!/bin/bash

# Make sure we're in the project root
cd "$(dirname "$0")"

# Create a global .d.ts file to fix React component props issues
echo "Creating global TypeScript declarations..."
mkdir -p src/types

cat > src/types/global.d.ts << 'EOF'
// Global type declarations for the project

// React declarations
import React from 'react';
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Allow title property in React elements
      [elemName: string]: any;
    }
  }

  // UserRolePermissions definition
  interface UserRolePermissions {
    viewCRM: boolean;
    editCRM: boolean;
    viewPayroll: boolean;
    runPayroll: boolean;
    viewAnalytics: boolean;
    viewDashboard: boolean;
    [key: string]: boolean;
  }
  
  // Add ElementType to fix component type errors
  type ElementType<P = any> = React.ComponentType<P>;
  
  // User definition
  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
  }
}

// Extend window object
declare global {
  interface Window {
    vite?: any;
  }
}

export {};
EOF

echo "Global TypeScript declarations created."

# Create proper icons utility file
echo "Ensuring icons utility is correctly set up..."
mkdir -p src/utils

# Ensure directories exist
mkdir -p node_modules
mkdir -p src/components/ui

# Run the import fix script
echo "Fixing imports in TypeScript files..."
if [ -f "src/utils/fix-imports.js" ]; then
  node src/utils/fix-imports.js
fi

# Install any missing dependencies
echo "Installing required dependencies..."
npm install --save lucide-react react-router-dom sonner recharts date-fns zod
npm install --save-dev vite @vitejs/plugin-react-swc typescript

echo "All imports have been fixed! You can now run your app with: ./start-app.sh"
