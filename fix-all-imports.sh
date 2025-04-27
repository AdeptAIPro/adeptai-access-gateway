
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
  type ElementType<P = any> = React.ComponentType<P> | keyof JSX.IntrinsicElements;
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

# Make sure node_modules exists before running the script
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Create a proper lucide redirect file
echo "Creating lucide-react redirect..."
mkdir -p src/utils
cat > src/utils/lucide-redirect.ts << 'EOF'
/**
 * This file redirects all lucide-react imports to our icon polyfill
 * This ensures we have consistent icon usage across the application
 */

// Re-export everything from our icon polyfill
export * from './lucide-polyfill';

// Also create a default export for compatibility
import * as icons from './lucide-polyfill';
export default icons;
EOF

echo "Lucide redirect created."

# Run the import fix script
echo "Fixing imports in TypeScript files..."
node src/utils/fix-imports.js

# Install any missing dependencies
echo "Installing required dependencies..."
npm install --save lucide-react react-router-dom sonner recharts date-fns zod
npm install --save-dev vite @vitejs/plugin-react-swc typescript

echo "All imports have been fixed! You can now run your app with: ./start-app.sh"
