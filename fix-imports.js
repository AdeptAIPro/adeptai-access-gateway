
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
    .replace(/from ["']@\/components\/ui\/label["']/g, "from '@/utils/shadcn-patches'");

  if (updatedContent !== content) {
    fs.writeFileSync(filePath, updatedContent);
    console.log(`Fixed imports in ${filePath}`);
  }
}

// Create missing polyfill files
function createPolyfills() {
  const utilsDir = path.join(__dirname, 'src/utils');
  if (!fs.existsSync(utilsDir)) {
    fs.mkdirSync(utilsDir, { recursive: true });
  }

  // Ensure icon directories exist
  const iconsDir = path.join(utilsDir, 'icons');
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  // Create basic icon polyfills if they don't exist
  const iconPolyfills = {
    'src/utils/icons/ui-icons.ts': `
import * as LucideIcons from 'lucide-react';

export const {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  Check,
  X,
  Plus,
  Minus,
  Menu
} = LucideIcons;
`,
    'src/utils/icons/data-icons.ts': `
import * as LucideIcons from 'lucide-react';

export const {
  Database,
  File,
  FileText,
  Folder,
  FolderOpen
} = LucideIcons;
`,
    'src/utils/icons/status-icons.ts': `
import * as LucideIcons from 'lucide-react';

export const {
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Info,
  Loader,
  Loader2,
  RefreshCw
} = LucideIcons;
`,
    'src/utils/icons/user-icons.ts': `
import * as LucideIcons from 'lucide-react';

export const {
  User,
  UserPlus,
  UserMinus,
  Users,
  UserCheck
} = LucideIcons;
`,
    'src/utils/icon-polyfill.ts': `// Re-export all icons from lucide-react
import * as LucideIcons from 'lucide-react';
export * from 'lucide-react';

// Also export from categorized files
export * from './icons/ui-icons';
export * from './icons/data-icons';
export * from './icons/status-icons';
export * from './icons/user-icons';
`,
    'src/utils/date-polyfill.ts': `// Re-export date-fns
export * from 'date-fns';
`,
    'src/utils/zod-polyfill.ts': `// Re-export zod with basic fallbacks
export * from 'zod';
`
  };

  for (const [filePath, content] of Object.entries(iconPolyfills)) {
    const fullPath = path.join(__dirname, filePath);
    const dir = path.dirname(fullPath);
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    if (!fs.existsSync(fullPath)) {
      fs.writeFileSync(fullPath, content.trim());
      console.log(`Created polyfill at ${fullPath}`);
    }
  }
}

// Main function
function main() {
  try {
    console.log('Setting up polyfills...');
    createPolyfills();
    
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
  } catch (error) {
    console.error('Error fixing imports:', error);
  }
}

main();
