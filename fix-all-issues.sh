
#!/bin/bash

echo "🔧 Starting comprehensive fixes for build errors..."

# Make all scripts executable
chmod +x fix-all-issues.sh
chmod +x start-dev.sh
chmod +x src/utils/fix-imports.js
[ -f "check-deps.sh" ] && chmod +x check-deps.sh
[ -f "setup-and-run.sh" ] && chmod +x setup-and-run.sh
[ -f "make-executable.sh" ] && chmod +x make-executable.sh
[ -f "ensure-vite.sh" ] && chmod +x ensure-vite.sh

# Create utility directories if they don't exist
mkdir -p src/utils
mkdir -p src/utils/icons
mkdir -p src/lib

# Install core dependencies
echo "📦 Installing project dependencies..."
npm install --save react-router-dom sonner zod react-hook-form @hookform/resolvers date-fns uuid
npm install --save-dev vite@latest @vitejs/plugin-react-swc typescript @types/uuid @types/node

# Ensure Vite is properly installed
if [ ! -f "./node_modules/.bin/vite" ]; then
  echo "📦 Installing Vite locally..."
  npm install --save-dev vite@latest --force
fi

# Run the fix-imports script to fix import paths
echo "🔧 Running import fixes..."
node src/utils/fix-imports.js

# Create a basic lib/utils.ts if it doesn't exist
if [ ! -f "src/lib/utils.ts" ]; then
  echo "Creating utils.ts..."
  mkdir -p src/lib
  cat > src/lib/utils.ts <<EOL
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
EOL
fi

# Create simple polyfill for clsx if it doesn't exist
if ! npm list clsx &>/dev/null; then
  mkdir -p src/lib
  cat > src/lib/clsx-polyfill.ts <<EOL
export type ClassValue = string | number | boolean | undefined | null | { [key: string]: any };

export function clsx(...inputs: ClassValue[]) {
  return inputs
    .filter(Boolean)
    .join(' ')
    .trim();
}

export default clsx;
EOL
  
  # Update utils.ts to use our polyfill
  sed -i 's/from "clsx"/from "@\/lib\/clsx-polyfill"/' src/lib/utils.ts 2>/dev/null || \
  sed -i '' 's/from "clsx"/from "@\/lib\/clsx-polyfill"/' src/lib/utils.ts
fi

# Create simple polyfill for tailwind-merge if it doesn't exist
if ! npm list tailwind-merge &>/dev/null; then
  mkdir -p src/lib
  cat > src/lib/tailwind-merge-polyfill.ts <<EOL
export function twMerge(...classLists: string[]) {
  return classLists
    .filter(Boolean)
    .join(' ')
    .trim();
}

export default twMerge;
EOL
  
  # Update utils.ts to use our polyfill
  sed -i 's/from "tailwind-merge"/from "@\/lib\/tailwind-merge-polyfill"/' src/lib/utils.ts 2>/dev/null || \
  sed -i '' 's/from "tailwind-merge"/from "@\/lib\/tailwind-merge-polyfill"/' src/lib/utils.ts
fi

# Create a helper script to fix PATH issues with Vite
cat > run-vite.sh << 'EOL'
#!/bin/bash
export PATH="$PATH:$(npm bin)"
export PATH="$PATH:$(npm config get prefix)/bin"
export PATH="$PATH:./node_modules/.bin"

if [ -f "./node_modules/.bin/vite" ]; then
  echo "Running local Vite from ./node_modules/.bin/vite"
  ./node_modules/.bin/vite "$@"
elif command -v npx &> /dev/null; then
  echo "Running Vite with npx"
  npx vite "$@"
else
  echo "❌ Vite not found! Please install it with: npm install --save-dev vite"
  exit 1
fi
EOL

chmod +x run-vite.sh

echo "✅ All fixes have been applied!"
echo "🚀 You can now start the development server with: ./run-vite.sh"
