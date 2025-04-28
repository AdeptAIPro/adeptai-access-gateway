
#!/usr/bin/env node

/**
 * This script fixes common import issues in the codebase
 */

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');

// Find all TypeScript files
function findTsFiles(dir) {
  let results = [];
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
  
  return results;
}

// Replace lucide-react imports with our polyfill
function fixLucideImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace direct lucide-react imports with our polyfill
  const updatedContent = content.replace(
    /from ['"]lucide-react['"]/g, 
    "from '@/utils/icon-polyfill'"
  );
  
  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent);
    console.log(`Fixed lucide imports in ${filePath}`);
  }
}

// Add @/utils/icon-polyfill.ts if it doesn't exist
function ensureIconPolyfill() {
  const polyfillPath = path.join(projectRoot, 'utils', 'icon-polyfill.ts');
  
  if (!fs.existsSync(path.dirname(polyfillPath))) {
    fs.mkdirSync(path.dirname(polyfillPath), { recursive: true });
  }
  
  if (!fs.existsSync(polyfillPath)) {
    const polyfillContent = `
/**
 * This file re-exports icons from lucide-react to avoid direct imports
 * which can cause issues in some builds.
 */
export * from 'lucide-react';
`;
    
    fs.writeFileSync(polyfillPath, polyfillContent.trim());
    console.log(`Created icon polyfill at ${polyfillPath}`);
  }
}

// Main function
function main() {
  try {
    console.log('Finding TypeScript files...');
    const tsFiles = findTsFiles(projectRoot);
    
    console.log(`Found ${tsFiles.length} TypeScript files. Fixing imports...`);
    
    ensureIconPolyfill();
    
    for (const file of tsFiles) {
      fixLucideImports(file);
    }
    
    console.log('Import fixing complete!');
  } catch (error) {
    console.error('Error fixing imports:', error);
    process.exit(1);
  }
}

main();
