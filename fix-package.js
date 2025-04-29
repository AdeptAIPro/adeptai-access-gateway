
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
    
    // Install the dependencies we just added
    console.log("Installing dependencies from the newly created package.json");
    try {
      execSync('npm install', { stdio: 'inherit' });
    } catch (error) {
      console.error('Error installing dependencies:', error);
    }
  } else {
    // Read existing package.json
    let packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
    let packageJson = JSON.parse(packageJsonContent);
    
    let updated = false;

    // Ensure scripts are properly set
    if (!packageJson.scripts) {
      packageJson.scripts = {};
      updated = true;
    }
    
    if (!packageJson.scripts.dev || packageJson.scripts.dev !== "vite") {
      packageJson.scripts.dev = "vite";
      updated = true;
    }
    
    if (!packageJson.scripts.build || packageJson.scripts.build !== "vite build") {
      packageJson.scripts.build = "vite build";
      updated = true;
    }
    
    if (!packageJson.scripts.start || packageJson.scripts.start !== "vite") {
      packageJson.scripts.start = "vite";
      updated = true;
    }
    
    // Ensure dependencies exist
    if (!packageJson.dependencies) {
      packageJson.dependencies = {};
      updated = true;
    }
    
    if (!packageJson.devDependencies) {
      packageJson.devDependencies = {};
      updated = true;
    }
    
    // Ensure vite is in devDependencies
    if (!packageJson.devDependencies.vite) {
      packageJson.devDependencies.vite = "^5.0.0";
      updated = true;
    }
    
    if (!packageJson.devDependencies['@vitejs/plugin-react-swc']) {
      packageJson.devDependencies['@vitejs/plugin-react-swc'] = "^3.5.0";
      updated = true;
    }
    
    // Write the updated package.json if changes were made
    if (updated) {
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log('✅ package.json has been updated');
      
      // Install the dependencies we just added
      console.log("Installing updated dependencies");
      try {
        execSync('npm install', { stdio: 'inherit' });
      } catch (error) {
        console.error('Error installing dependencies:', error);
      }
    } else {
      console.log('✅ package.json is already properly configured');
    }
  }
  
  // Ensure Vite is installed globally as a backup option
  console.log('Installing vite globally as a backup...');
  try {
    execSync('npm install -g vite@latest', { stdio: 'inherit' });
    console.log('✅ Global Vite installation complete');
  } catch (error) {
    console.error('Warning: Could not install Vite globally. Continuing with local installation.');
  }
  
  // Install vite and dependencies if not already installed
  console.log('Installing vite and core dependencies locally...');
  try {
    execSync('npm install --save-dev vite@latest @vitejs/plugin-react-swc typescript', { stdio: 'inherit' });
    console.log('✅ Local Vite installation complete');
  } catch (error) {
    console.error('❌ Error installing Vite locally:', error);
  }
  
} catch (error) {
  console.error('❌ Error updating package.json:', error);
  process.exit(1);
}
