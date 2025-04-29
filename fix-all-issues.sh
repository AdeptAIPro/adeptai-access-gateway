
#!/bin/bash

echo "🔧 Starting comprehensive fixes for build errors..."

# Make all scripts executable
chmod +x fix-all-issues.sh
[ -f "start-dev.sh" ] && chmod +x start-dev.sh
[ -f "src/utils/fix-imports.js" ] && chmod +x src/utils/fix-imports.js
[ -f "check-deps.sh" ] && chmod +x check-deps.sh
[ -f "setup-and-run.sh" ] && chmod +x setup-and-run.sh
[ -f "make-executable.sh" ] && chmod +x make-executable.sh
[ -f "ensure-vite.sh" ] && chmod +x ensure-vite.sh
[ -f "run-vite.sh" ] && chmod +x run-vite.sh
[ -f "fix-all-imports.sh" ] && chmod +x fix-all-imports.sh

# Create utility directories if they don't exist
mkdir -p src/utils
mkdir -p src/utils/icons
mkdir -p src/lib
mkdir -p src/services/aws/lambda

# Install core dependencies
echo "📦 Installing project dependencies..."
npm install --save react-router-dom sonner zod react-hook-form @hookform/resolvers date-fns uuid
npm install --save-dev vite@latest @vitejs/plugin-react-swc typescript @types/uuid @types/node
npm install --save aws-sdk @aws-sdk/client-s3 @aws-sdk/client-dynamodb @aws-sdk/util-dynamodb
npm install --global vite

# Install shadcn-ui dependencies
npm install --save @radix-ui/react-tabs @radix-ui/react-select @radix-ui/react-dropdown-menu @radix-ui/react-radio-group @radix-ui/react-label @radix-ui/react-dialog
 
# Ensure Vite is properly installed
if [ ! -f "./node_modules/.bin/vite" ]; then
  echo "📦 Installing Vite locally..."
  npm install --save-dev vite@latest --force
fi

# Run the fix-imports script to fix import paths
if [ -f "src/utils/fix-imports.js" ]; then
  echo "🔧 Running import fixes..."
  node src/utils/fix-imports.js
elif [ -f "fix-imports.js" ]; then
  echo "🔧 Running import fixes from root directory..."
  node fix-imports.js
else
  echo "📝 Creating fix-imports.js script..."
  cat > fix-imports.js << 'EOL'
const fs = require('fs');
const path = require('path');

// Function to recursively find all TypeScript files
function findTsFiles(dir) {
  let results = [];
  
  if (!fs.existsSync(dir)) {
    console.error(`Directory does not exist: ${dir}`);
    return results;
  }
  
  try {
    const list = fs.readdirSync(dir);
    
    for (const file of list) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        results = results.concat(findTsFiles(filePath));
      } else if (/\.(ts|tsx)$/.test(file)) {
        results.push(filePath);
      }
    }
  } catch (err) {
    console.error(`Error reading directory: ${err.message}`);
  }
  
  return results;
}

// Fix imports and shadcn component props
function fixImportsAndProps(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace imports
  let updatedContent = content
    .replace(/from ['"]react-router-dom['"]/g, "from '@/utils/router-polyfill'")
    .replace(/from ['"]sonner['"]/g, "from '@/utils/sonner-polyfill'")
    .replace(/from ['"]zod['"]/g, "from '@/utils/zod-polyfill'") 
    .replace(/from ['"]date-fns['"]/g, "from '@/utils/date-polyfill'")
    .replace(/from ['"]react-hook-form['"]/g, "from '@/utils/hook-form-polyfill'")
    .replace(/from ['"]@hookform\/resolvers\/zod['"]/g, "from '@/utils/hook-form-polyfill'")
    .replace(/from ['"]lucide-react['"]/g, "from '@/utils/icon-polyfill'");

  // Fix shadcn import paths
  updatedContent = updatedContent
    .replace(/from ["']@\/components\/ui\/tabs["']/g, "from '@/utils/shadcn-patches'")
    .replace(/from ["']@\/components\/ui\/dropdown-menu["']/g, "from '@/utils/shadcn-patches'")
    .replace(/from ["']@\/components\/ui\/select["']/g, "from '@/utils/shadcn-patches'")
    .replace(/from ["']@\/components\/ui\/label["']/g, "from '@/utils/shadcn-patches'")
    .replace(/from ["']@\/components\/ui\/dialog["']/g, "from '@/utils/shadcn-patches'")
    .replace(/from ["']@\/components\/ui\/radio-group["']/g, "from '@/utils/shadcn-patches'");

  if (updatedContent !== content) {
    fs.writeFileSync(filePath, updatedContent);
    console.log(`Fixed imports in ${filePath}`);
  }
}

// Main execution
console.log('🔍 Finding TypeScript files...');
try {
  const srcDir = path.resolve(__dirname, './src');
  console.log(`Looking for TypeScript files in: ${srcDir}`);
  const files = findTsFiles(srcDir);
  console.log(`📁 Found ${files.length} TypeScript files`);

  let updatedCount = 0;
  for (const file of files) {
    try {
      fixImportsAndProps(file);
      updatedCount++;
    } catch (error) {
      console.error(`❌ Error fixing imports in ${file}:`, error);
    }
  }

  console.log(`\n✨ Done! Updated imports in ${updatedCount} files`);
} catch (err) {
  console.error('❌ Error during import fixing process:', err);
}
EOL

  echo "🔧 Running import fixes..."
  node fix-imports.js
fi

# Create a helper script to fix PATH issues with Vite
cat > run-vite.sh << 'EOL'
#!/bin/bash
export PATH="$PATH:$(npm bin)"
export PATH="$PATH:$(npm config get prefix)/bin"
export PATH="$PATH:./node_modules/.bin"
export PATH="$PATH:$HOME/.npm/bin"

if [ -f "./node_modules/.bin/vite" ]; then
  echo "Running local Vite from ./node_modules/.bin/vite"
  ./node_modules/.bin/vite "$@"
elif command -v npx &> /dev/null; then
  echo "Running Vite with npx"
  npx vite "$@"
elif command -v vite &> /dev/null; then
  echo "Running global Vite"
  vite "$@"
else
  echo "❌ Vite not found! Installing it now..."
  npm install --save-dev vite@latest @vitejs/plugin-react-swc
  npm install --global vite
  
  # Try running with npx after installation
  if command -v npx &> /dev/null; then
    npx vite
  elif command -v vite &> /dev/null; then
    vite
  else
    # If npx is not available, try direct access
    ./node_modules/.bin/vite
  fi
fi
EOL

chmod +x run-vite.sh

echo "✅ All fixes have been applied!"
echo "🚀 You can now start the development server with: ./run-vite.sh"
