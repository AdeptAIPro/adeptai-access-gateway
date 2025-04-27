
#!/bin/bash

# Make sure we're in the project root
cd "$(dirname "$0")"

# Make scripts executable
chmod +x setup.sh
chmod +x start-app.sh
chmod +x fix-all-imports.sh

# Run the setup
./setup.sh

# Fix all imports
./fix-all-imports.sh

echo "Setup completed! Run ./start-app.sh to start your application."
