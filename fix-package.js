
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
    console.log("Created new package.json file");
  }

  // Read existing package.json
  let packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
  let packageJson = JSON.parse(packageJsonContent);
  
  let updated = false;

  // Ensure scripts are properly set
  if (!packageJson.scripts || !packageJson.scripts.dev || packageJson.scripts.dev !== "vite") {
    packageJson.scripts = {
      ...packageJson.scripts,
      "dev": "vite",
      "build": "vite build",
      "start": "vite",
    };
    updated = true;
  }
  
  // Ensure vite is in devDependencies
  if (!packageJson.devDependencies || !packageJson.devDependencies.vite) {
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      "vite": "^5.0.0",
      "@vitejs/plugin-react-swc": "^3.5.0"
    };
    updated = true;
  }
  
  // Write the updated package.json if changes were made
  if (updated) {
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('✅ package.json has been updated');
  } else {
    console.log('✅ package.json is already properly configured');
  }
  
  // Install vite and dependencies if not already installed
  console.log('Installing vite and core dependencies...');
  try {
    execSync('npm list vite --depth=0', { stdio: 'ignore' });
    console.log('Vite is already installed');
  } catch (e) {
    console.log('Installing Vite...');
    execSync('npm install --save-dev vite@latest @vitejs/plugin-react-swc', { stdio: 'inherit' });
  }
  
} catch (error) {
  console.error('❌ Error updating package.json:', error);
  process.exit(1);
}
