
const fs = require('fs');
const path = require('path');

// Function to recursively find all TypeScript files
function findTsFiles(dir) {
  if (!fs.existsSync(dir)) {
    console.warn(`Directory not found: ${dir}`);
    return [];
  }

  try {
    const files = fs.readdirSync(dir);
    const result = [];
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      try {
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          result.push(...findTsFiles(filePath));
        } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
          result.push(filePath);
        }
      } catch (err) {
        console.warn(`Error processing ${filePath}: ${err.message}`);
      }
    }
    
    return result;
  } catch (err) {
    console.warn(`Error reading directory ${dir}: ${err.message}`);
    return [];
  }
}

// Update imports in a file
function updateImports(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      return false;
    }

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
      console.log(`✅ Updated lucide-react imports in ${filePath}`);
    }
    
    // Replace direct react-router-dom imports with our polyfill
    const updatedContent2 = content.replace(
      /from ['"]react-router-dom['"]/g, 
      "from '@/utils/router-polyfill'"
    );
    
    if (content !== updatedContent2) {
      content = updatedContent2;
      updated = true;
      console.log(`✅ Updated react-router-dom imports in ${filePath}`);
    }
    
    // Replace direct sonner imports with our polyfill
    const updatedContent3 = content.replace(
      /from ['"]sonner['"]/g, 
      "from '@/utils/sonner-polyfill'"
    );
    
    if (content !== updatedContent3) {
      content = updatedContent3;
      updated = true;
      console.log(`✅ Updated sonner imports in ${filePath}`);
    }
    
    // Only write if changes were made
    if (updated) {
      fs.writeFileSync(filePath, content);
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
try {
  const srcDir = path.resolve(__dirname, '..');
  console.log(`Looking for TypeScript files in: ${srcDir}`);
  const files = findTsFiles(srcDir);
  console.log(`📁 Found ${files.length} TypeScript files`);

  let updatedCount = 0;
  for (const file of files) {
    if (updateImports(file)) {
      updatedCount++;
    }
  }

  console.log(`✅ Fixed imports in ${updatedCount} files`);
} catch (error) {
  console.error('❌ Error fixing imports:', error);
  process.exit(1);
}
