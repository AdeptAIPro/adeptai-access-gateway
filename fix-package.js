
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Path to package.json
const packageJsonPath = path.join(__dirname, 'package.json');

try {
  // Check if package.json exists
  if (!fs.existsSync(packageJsonPath)) {
    console.log('Creating package.json as it does not exist');
    const basicPackageJson = {
      "name": "vite_react_shadcn_ts",
      "private": true,
      "version": "0.0.0",
      "type": "module",
      "scripts": {
        "dev": "vite",
        "build": "vite build",
        "start": "vite"
      },
      "dependencies": {
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "react-router-dom": "^6.22.0",
        "sonner": "^1.0.0",
        "zod": "^3.22.4",
        "react-hook-form": "^7.45.0",
        "@hookform/resolvers": "^3.1.0"
      },
      "devDependencies": {
        "vite": "^5.0.0",
        "@vitejs/plugin-react-swc": "^3.5.0",
        "typescript": "^5.3.0"
      }
    };
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(basicPackageJson, null, 2));
  }

  // Read existing package.json
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Ensure scripts are properly set
  packageJson.scripts = {
    ...packageJson.scripts,
    "dev": "vite",
    "build": "vite build",
    "start": "vite",
  };
  
  // Write the updated package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  
  console.log('✅ package.json has been updated successfully');
  
  // Install vite and dependencies
  console.log('Installing vite and core dependencies...');
  execSync('npm install --save-dev vite@latest @vitejs/plugin-react-swc', { stdio: 'inherit' });
  
} catch (error) {
  console.error('❌ Error updating package.json:', error);
}
