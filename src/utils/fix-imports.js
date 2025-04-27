
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Directories to search for files
const searchDirs = [
  'src/components',
  'src/hooks',
  'src/services',
  'src/utils',
  'src/pages',
  'src/layouts',
  'src/lib',
  'src/providers'
];

// Find all TypeScript files
function findFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findFiles(filePath, fileList);
    } else if (/\.(ts|tsx|js|jsx)$/.test(file)) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Fix imports in a file
function fixImports(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Replace lucide-react imports with our polyfill
    if (content.includes("from 'lucide-react'") || content.includes('from "lucide-react"')) {
      content = content.replace(/(from\s+['"])lucide-react(['"])/g, '$1@/utils/lucide-polyfill$2');
      modified = true;
    }
    
    // Handle default imports from lucide-react
    if (content.includes("lucide-react';") || content.includes('lucide-react";')) {
      content = content.replace(/(import\s+[A-Za-z0-9_]+\s+from\s+['"])lucide-react(['"])/g, '$1@/utils/lucide-polyfill$2');
      modified = true;
    }
    
    // Replace date-fns imports with our polyfill
    if (content.includes("from 'date-fns'") || content.includes('from "date-fns"')) {
      content = content.replace(/(from\s+['"])date-fns(['"])/g, '$1@/utils/date-polyfill$2');
      modified = true;
    }
    
    // Replace sonner imports with our polyfill
    if (content.includes("from 'sonner'") || content.includes('from "sonner"')) {
      content = content.replace(/(from\s+['"])sonner(['"])/g, '$1@/utils/sonner-polyfill$2');
      modified = true;
    }
    
    // Write modified content back to file
    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed imports in: ${filePath}`);
      return true;
    }
  } catch (error) {
    console.error(`❌ Error processing file ${filePath}:`, error);
  }
  
  return false;
}

// Main function
function main() {
  console.log('🔍 Searching for files to fix imports...');
  
  let allFiles = [];
  searchDirs.forEach(dir => {
    const dirPath = path.join(process.cwd(), dir);
    if (fs.existsSync(dirPath)) {
      allFiles = [...allFiles, ...findFiles(dirPath)];
    }
  });
  
  console.log(`🔎 Found ${allFiles.length} files to check`);
  
  let fixedFilesCount = 0;
  allFiles.forEach(file => {
    if (fixImports(file)) {
      fixedFilesCount++;
    }
  });
  
  console.log(`🎉 Fixed imports in ${fixedFilesCount} files`);
}

main();
