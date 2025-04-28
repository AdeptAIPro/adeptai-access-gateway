
#!/bin/bash

# Install dependencies
npm install

# Fix imports
node src/utils/fix-imports.js

# Start the application
npm run dev
