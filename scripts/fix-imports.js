
const fs = require('fs');
const path = require('path');

// Function to recursively find all TypeScript files
function findTsFiles(dir) {
  const files = fs.readdirSync(dir);
  const result = [];
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      result.push(...findTsFiles(filePath));
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      result.push(filePath);
    }
  }
  
  return result;
}

// Update imports in a file
function updateImports(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace direct lucide-react imports with our polyfill
    const updatedContent = content.replace(
      /from ['"]lucide-react['"]/g,
      "from '@/utils/icon-polyfill'"
    );
    
    // Only write if changes were made
    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent);
      console.log(`✅ Updated imports in ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error);
    return false;
  }
}

// Main execution
console.log('🔍 Finding TypeScript files...');
const srcDir = path.resolve(__dirname, '../src');
const files = findTsFiles(srcDir);
console.log(`📁 Found ${files.length} TypeScript files`);

let updatedCount = 0;
for (const file of files) {
  if (updateImports(file)) {
    updatedCount++;
  }
}

console.log(`\n✨ Done! Updated imports in ${updatedCount} files`);
