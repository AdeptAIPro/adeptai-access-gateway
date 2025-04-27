
#!/bin/bash

# Make script executable
chmod +x fix-imports.js

# Run the import fix script
node src/utils/fix-imports.js

echo "✅ All imports have been fixed"
