
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

  // Fix shadcn component props
  // This adds the necessary children prop to types that use forwardRef
  if (filePath.includes('src/components/ui/')) {
    // Don't modify the shadcn components
    return;
  }

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
  } catch (error) {
    console.error('Error fixing imports:', error);
  }
}

// Create patches for shadcn components
function createShadcnPatches() {
  // Create a utility file to patch shadcn component types
  const patchFilePath = path.join(__dirname, 'src/utils/shadcn-patches.tsx');
  
  const patchContent = `
import React from 'react';
import {
  Tabs as OriginalTabs,
  TabsList as OriginalTabsList,
  TabsTrigger as OriginalTabsTrigger,
  TabsContent as OriginalTabsContent,
} from "@/components/ui/tabs";

import {
  DropdownMenu as OriginalDropdownMenu,
  DropdownMenuTrigger as OriginalDropdownMenuTrigger,
  DropdownMenuContent as OriginalDropdownMenuContent,
  DropdownMenuItem as OriginalDropdownMenuItem,
  DropdownMenuLabel as OriginalDropdownMenuLabel,
  DropdownMenuSeparator as OriginalDropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import {
  Select as OriginalSelect,
  SelectTrigger as OriginalSelectTrigger,
  SelectContent as OriginalSelectContent,
  SelectItem as OriginalSelectItem,
  SelectValue as OriginalSelectValue,
} from "@/components/ui/select";

import {
  Label as OriginalLabel,
} from "@/components/ui/label";

// Export patched Tabs components
export const Tabs = ({ children, ...props }: React.ComponentProps<typeof OriginalTabs> & { children: React.ReactNode }) => 
  <OriginalTabs {...props}>{children}</OriginalTabs>;

export const TabsList = ({ children, ...props }: React.ComponentProps<typeof OriginalTabsList> & { children: React.ReactNode }) => 
  <OriginalTabsList {...props}>{children}</OriginalTabsList>;

export const TabsTrigger = ({ children, ...props }: React.ComponentProps<typeof OriginalTabsTrigger> & { children: React.ReactNode }) => 
  <OriginalTabsTrigger {...props}>{children}</OriginalTabsTrigger>;

export const TabsContent = ({ children, ...props }: React.ComponentProps<typeof OriginalTabsContent> & { children: React.ReactNode }) => 
  <OriginalTabsContent {...props}>{children}</OriginalTabsContent>;

// Export patched DropdownMenu components
export const DropdownMenu = OriginalDropdownMenu;

export const DropdownMenuTrigger = ({ children, ...props }: React.ComponentProps<typeof OriginalDropdownMenuTrigger> & { children: React.ReactNode }) => 
  <OriginalDropdownMenuTrigger {...props}>{children}</OriginalDropdownMenuTrigger>;

export const DropdownMenuContent = ({ children, ...props }: React.ComponentProps<typeof OriginalDropdownMenuContent> & { children: React.ReactNode }) => 
  <OriginalDropdownMenuContent {...props}>{children}</OriginalDropdownMenuContent>;

export const DropdownMenuItem = ({ children, ...props }: React.ComponentProps<typeof OriginalDropdownMenuItem> & { children: React.ReactNode }) => 
  <OriginalDropdownMenuItem {...props}>{children}</OriginalDropdownMenuItem>;

export const DropdownMenuLabel = ({ children, ...props }: React.ComponentProps<typeof OriginalDropdownMenuLabel> & { children: React.ReactNode }) => 
  <OriginalDropdownMenuLabel {...props}>{children}</OriginalDropdownMenuLabel>;

export const DropdownMenuSeparator = OriginalDropdownMenuSeparator;

// Export patched Select components
export const Select = OriginalSelect; 

export const SelectTrigger = ({ children, ...props }: React.ComponentProps<typeof OriginalSelectTrigger> & { children: React.ReactNode }) => 
  <OriginalSelectTrigger {...props}>{children}</OriginalSelectTrigger>;

export const SelectContent = ({ children, ...props }: React.ComponentProps<typeof OriginalSelectContent> & { children: React.ReactNode }) => 
  <OriginalSelectContent {...props}>{children}</OriginalSelectContent>;

export const SelectItem = ({ children, ...props }: React.ComponentProps<typeof OriginalSelectItem> & { children: React.ReactNode }) => 
  <OriginalSelectItem {...props}>{children}</OriginalSelectItem>;

export const SelectValue = ({ children, ...props }: React.ComponentProps<typeof OriginalSelectValue> & { children: React.ReactNode }) => 
  <OriginalSelectValue {...props}>{children}</OriginalSelectValue>;

// Export patched Label component
export const Label = ({ children, ...props }: React.ComponentProps<typeof OriginalLabel> & { children: React.ReactNode }) => 
  <OriginalLabel {...props}>{children}</OriginalLabel>;
`;

  fs.writeFileSync(patchFilePath, patchContent);
  console.log(`Created shadcn patches at ${patchFilePath}`);

  // Create a utility file that redirects imports to the patched components
  const redirectFilePath = path.join(__dirname, 'src/utils/shadcn-components.ts');
  
  const redirectContent = `
// This file redirects imports to the patched shadcn components
export * from './shadcn-patches';
`;

  fs.writeFileSync(redirectFilePath, redirectContent);
  console.log(`Created shadcn redirect at ${redirectFilePath}`);
}

main();
