
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Paths
const packageJsonPath = path.join(process.cwd(), 'package.json');

try {
  console.log('📦 Fixing package.json configuration...');
  
  // Read existing package.json
  let packageJson = {};
  try {
    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
    packageJson = JSON.parse(packageJsonContent);
  } catch (error) {
    console.warn('Could not read package.json, creating a new one');
    packageJson = { name: 'adept-ai-pro', private: true };
  }
  
  // Ensure basic structure
  packageJson.name = packageJson.name || 'adept-ai-pro';
  packageJson.version = packageJson.version || '0.1.0';
  packageJson.private = true;
  packageJson.type = 'module';
  
  // Update scripts
  packageJson.scripts = {
    ...(packageJson.scripts || {}),
    dev: 'vite',
    'build': 'vite build',
    'build:dev': 'vite build --mode development',
    'lint': 'eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0',
    'preview': 'vite preview'
  };
  
  // Ensure dependencies
  packageJson.dependencies = {
    ...(packageJson.dependencies || {}),
    'react': '^18.2.0',
    'react-dom': '^18.2.0',
    'react-router-dom': '^6.10.0',
    '@hookform/resolvers': '^3.1.0',
    'react-hook-form': '^7.44.3',
    'zod': '^3.21.4',
    'uuid': '^9.0.0',
    'sonner': '^0.6.2'
  };
  
  // Ensure dev dependencies
  packageJson.devDependencies = {
    ...(packageJson.devDependencies || {}),
    '@types/react': '^18.2.15',
    '@types/react-dom': '^18.2.7',
    '@types/uuid': '^9.0.1',
    '@typescript-eslint/eslint-plugin': '^6.1.0',
    '@typescript-eslint/parser': '^6.1.0',
    '@vitejs/plugin-react-swc': '^3.3.2',
    'typescript': '^5.0.2',
    'vite': '^4.4.8'
  };
  
  // Write updated package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('✅ package.json has been updated');
  
  // Create or update tsconfig.json
  const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
  try {
    const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
    // Ensure aliases are configured
    if (!tsconfig.compilerOptions.paths || !tsconfig.compilerOptions.paths['@/*']) {
      console.log('📝 Adding path aliases to tsconfig.json');
      tsconfig.compilerOptions = {
        ...tsconfig.compilerOptions,
        paths: {
          ...(tsconfig.compilerOptions.paths || {}),
          '@/*': ['./src/*']
        }
      };
      fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
      console.log('✅ tsconfig.json has been updated');
    }
  } catch (error) {
    console.warn('Could not update tsconfig.json:', error.message);
  }
  
  // Create or update vite.config.ts
  const viteConfigPath = path.join(process.cwd(), 'vite.config.ts');
  try {
    // Check if vite config exists
    let existingConfig = '';
    try {
      existingConfig = fs.readFileSync(viteConfigPath, 'utf8');
    } catch (error) {
      // File doesn't exist, we'll create it
    }
    
    // Only create if it doesn't exist or doesn't have the alias configuration
    if (!existingConfig || !existingConfig.includes('@/*')) {
      console.log('📝 Creating vite.config.ts with path aliases');
      const viteConfig = `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
      `.trim();
      fs.writeFileSync(viteConfigPath, viteConfig);
      console.log('✅ vite.config.ts has been created');
    }
  } catch (error) {
    console.warn('Could not create vite.config.ts:', error.message);
  }
  
  console.log('✨ Configuration files have been prepared');
} catch (error) {
  console.error('❌ Error updating configuration:', error.message);
  process.exit(1);
}
