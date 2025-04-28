
const fs = require('fs');
const path = require('path');

function findFiles(dir) {
  const files = fs.readdirSync(dir);
  const result = [];
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      result.push(...findFiles(filePath));
    } else if (/\.(ts|tsx)$/.test(file)) {
      result.push(filePath);
    }
  });
  
  return result;
}

function fixImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace lucide-react imports with our polyfill
  content = content.replace(
    /from ['"]lucide-react['"]/g, 
    `from '@/utils/icon-polyfill'`
  );
  
  fs.writeFileSync(filePath, content);
  console.log(`Fixed imports in ${filePath}`);
}

const files = findFiles('./src');
files.forEach(fixImports);
console.log('All imports have been fixed');
