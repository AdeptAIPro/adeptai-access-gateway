
#!/usr/bin/env node

/**
 * This script fixes common import issues in the codebase
 */

const fs = require('fs');
const path = require('path');

// Find all TypeScript files
function findTsFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  
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

// Fix import issues in files
function fixImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;
  
  // Replace direct lucide-react imports with our polyfill
  const updatedContent1 = content.replace(
    /from ['"]lucide-react['"]/g, 
    "from '@/utils/icon-polyfill'"
  );
  
  if (content !== updatedContent1) {
    content = updatedContent1;
    updated = true;
  }
  
  // Replace direct react-router-dom imports with our polyfill
  const updatedContent2 = content.replace(
    /from ['"]react-router-dom['"]/g, 
    "from '@/utils/router-polyfill'"
  );
  
  if (content !== updatedContent2) {
    content = updatedContent2;
    updated = true;
  }
  
  // Replace direct sonner imports with our polyfill
  const updatedContent3 = content.replace(
    /from ['"]sonner['"]/g, 
    "from '@/utils/sonner-polyfill'"
  );
  
  if (content !== updatedContent3) {
    content = updatedContent3;
    updated = true;
  }
  
  // Replace direct zod imports with our polyfill
  const updatedContent4 = content.replace(
    /from ['"]zod['"]/g, 
    "from '@/utils/zod-polyfill'"
  );
  
  if (content !== updatedContent4) {
    content = updatedContent4;
    updated = true;
  }
  
  if (updated) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed imports in ${filePath}`);
  }
}

// Main function
console.log('🔍 Finding TypeScript files...');
const srcDir = path.resolve(__dirname, '..');
const files = findTsFiles(srcDir);
console.log(`📁 Found ${files.length} TypeScript files`);

let updatedCount = 0;
for (const file of files) {
  try {
    fixImports(file);
    updatedCount++;
  } catch (error) {
    console.error(`❌ Error fixing imports in ${file}:`, error);
  }
}

console.log(`✅ Checked ${updatedCount} files for import issues`);
