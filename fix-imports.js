
const fs = require('fs');
const path = require('path');

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

// Fix imports
function fixImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace imports
  const updatedContent = content
    .replace(/from ['"]react-router-dom['"]/g, "from '@/utils/router-polyfill'")
    .replace(/from ['"]sonner['"]/g, "from '@/utils/sonner-polyfill'")
    .replace(/from ['"]zod['"]/g, "from '@/utils/zod-polyfill'") 
    .replace(/from ['"]date-fns['"]/g, "from '@/utils/date-polyfill'")
    .replace(/from ['"]react-hook-form['"]/g, "from '@/utils/hook-form-polyfill'")
    .replace(/from ['"]@hookform\/resolvers\/zod['"]/g, "from '@/utils/hook-form-polyfill'");
  
  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent);
    console.log(`Fixed imports in ${filePath}`);
  }
}

// Main function
function main() {
  try {
    console.log('Finding TypeScript files...');
    const srcDir = path.join(__dirname, 'src');
    
    if (fs.existsSync(srcDir)) {
      const tsFiles = findTsFiles(srcDir);
      console.log(`Found ${tsFiles.length} TypeScript files.`);
      
      for (const file of tsFiles) {
        fixImports(file);
      }
      
      console.log('Import fixing completed.');
    } else {
      console.error('src directory not found.');
    }
  } catch (error) {
    console.error('Error fixing imports:', error);
  }
}

main();
