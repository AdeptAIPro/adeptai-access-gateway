
const fs = require('fs');
const path = require('path');

// Read package.json
const packageJsonPath = path.join(__dirname, 'package.json');
let packageJson;

try {
  packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Ensure proper scripts
  packageJson.scripts = {
    ...packageJson.scripts,
    "dev": "vite",
    "build": "vite build",
    "start": "vite",
  };
  
  // Ensure proper dependencies
  packageJson.dependencies = {
    ...packageJson.dependencies,
    "lucide-react": "^0.294.0",
    "react-router-dom": "^6.22.0",
    "sonner": "^1.0.0",
    "recharts": "^2.11.0",
    "date-fns": "^2.30.0",
    "zod": "^3.22.4",
  };
  
  // Ensure proper dev dependencies
  packageJson.devDependencies = {
    ...packageJson.devDependencies,
    "vite": "^5.0.0",
    "@vitejs/plugin-react-swc": "^3.5.0",
    "typescript": "^5.3.0",
  };
  
  // Write updated package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('✅ package.json has been updated successfully');
  
} catch (error) {
  console.error('❌ Error updating package.json:', error);
}
