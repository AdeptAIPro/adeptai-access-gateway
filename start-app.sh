
#!/bin/bash

# Make scripts executable
chmod +x setup-dependencies.sh
chmod +x run-fix-imports.sh
chmod +x fix-all-issues.sh
chmod +x start-dev.sh

# Run the comprehensive fix script
./fix-all-issues.sh
