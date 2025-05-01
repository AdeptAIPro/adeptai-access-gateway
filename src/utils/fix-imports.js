
#!/usr/bin/env node

/**
 * This script fixes common import issues in the codebase
 */

const fs = require('fs');
const path = require('path');

// Find all TypeScript files
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
    }
    
    // Replace direct zod imports with our polyfill
    const updatedContent2 = content.replace(
      /from ['"]zod['"]/g, 
      "from '@/utils/zod-polyfill'"
    );
    
    if (content !== updatedContent2) {
      content = updatedContent2;
      updated = true;
    }
    
    // Replace shadcn component imports with fixed versions
    const updatedContent3 = content.replace(
      /<(Label|SelectTrigger|SelectContent|SelectItem)([^>]*)>/g, 
      '<Fixed$1$2>'
    );

    if (content !== updatedContent3) {
      content = updatedContent3;
      
      // Add import for fixed components if needed
      const importsFixed = `import { Fixed${content.includes('FixedLabel') ? 'Label' : ''
        }${content.includes('FixedSelectTrigger') ? ', FixedSelectTrigger' : ''
        }${content.includes('FixedSelectContent') ? ', FixedSelectContent' : ''
        }${content.includes('FixedSelectItem') ? ', FixedSelectItem' : ''} } from "@/utils/shadcn-patches";`;
      
      // Add import if it doesn't exist yet
      if (!content.includes('import') || !content.includes('@/utils/shadcn-patches')) {
        const lastImport = content.lastIndexOf('import');
        const lastImportEnd = content.indexOf('\n', lastImport);
        
        if (lastImport !== -1 && lastImportEnd !== -1) {
          content = content.slice(0, lastImportEnd + 1) + importsFixed + '\n' + content.slice(lastImportEnd + 1);
        } else {
          content = importsFixed + '\n' + content;
        }
      }
      
      updated = true;
    }
    
    if (updated) {
      fs.writeFileSync(filePath, content);
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
try {
  const srcDir = path.resolve(__dirname, '../src');
  console.log(`Looking for TypeScript files in: ${srcDir}`);
  const files = findTsFiles(srcDir);
  console.log(`📁 Found ${files.length} TypeScript files`);

  let updatedCount = 0;
  for (const file of files) {
    if (updateImports(file)) {
      updatedCount++;
    }
  }

  console.log(`\n✨ Done! Updated imports in ${updatedCount} files`);
} catch (err) {
  console.error('❌ Error during import fixing process:', err);
}
