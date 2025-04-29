
const fs = require('fs');
const path = require('path');

// Function to recursively find all TypeScript files
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
    .replace(/from ["']@\/components\/ui\/label["']/g, "from '@/utils/shadcn-patches'");

  // Add children type if using shadcn components
  if (updatedContent !== content) {
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
        fixImportsAndProps(file);
      }
      
      console.log('Import fixing completed.');
    } else {
      console.error('src directory not found.');
    }

    // Also create patch file for shadcn components
    createShadcnPatches();
    createPolyfills();
  } catch (error) {
    console.error('Error fixing imports:', error);
  }
}

// Create patches for shadcn components
function createShadcnPatches() {
  // Create a utility file to redirect imports to the patched components
  const redirectFilePath = path.join(__dirname, 'src/utils/shadcn-components.ts');
  
  const redirectContent = `
// This file redirects imports to the patched shadcn components
export * from './shadcn-patches';
`;

  fs.writeFileSync(redirectFilePath, redirectContent);
  console.log(`Created shadcn redirect at ${redirectFilePath}`);
}

// Create polyfill files if they don't exist
function createPolyfills() {
  const polyfills = {
    'src/utils/icon-polyfill.ts': `// Re-export all icons from lucide-react
export * from 'lucide-react';
`,
    'src/utils/hook-form-polyfill.ts': `// Re-export react-hook-form
export * from 'react-hook-form';
export * from '@hookform/resolvers/zod';
`,
    'src/utils/zod-polyfill.ts': `// Re-export zod
export * from 'zod';
`,
    'src/utils/date-polyfill.ts': `// Re-export date-fns
export * from 'date-fns';
`
  };

  for (const [filePath, content] of Object.entries(polyfills)) {
    if (!fs.existsSync(filePath)) {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(filePath, content);
      console.log(`Created polyfill at ${filePath}`);
    }
  }
}

main();
