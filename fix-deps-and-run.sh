
#!/bin/bash

echo "🚀 Setting up project and fixing dependencies..."

# Make this script executable
chmod +x fix-deps-and-run.sh

# Make other scripts executable
chmod +x setup-vite.sh
chmod +x run-dev.sh
chmod +x start.sh
chmod +x start-app.sh
chmod +x make-executable.sh

# Run setup-vite.sh first to prepare the environment
echo "🔧 Running setup-vite.sh..."
./setup-vite.sh

# Install required dependencies if they're missing
echo "📦 Installing required dependencies..."
npm install --save react react-dom react-router-dom sonner date-fns zod lucide-react @radix-ui/react-toast
npm install --save-dev @types/react @types/react-dom typescript
npm install --save class-variance-authority tailwind-merge clsx

# Create necessary directories if they don't exist
mkdir -p src/utils/icons
mkdir -p src/types

# Create a needed ErrorType if it doesn't exist
if [ ! -f "src/utils/errors/types.ts" ]; then
  mkdir -p src/utils/errors
  cat > src/utils/errors/types.ts << 'EOL'
export enum ErrorType {
  NETWORK = 'NETWORK',
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  NOT_FOUND = 'NOT_FOUND',
  SERVER = 'SERVER',
  UNKNOWN = 'UNKNOWN'
}

export interface ErrorDetails {
  message: string;
  type: ErrorType;
  code?: string;
  originalError?: any;
  stack?: string;
}
EOL
  echo "Created error types file"
fi

# Run the development server
echo "🚀 Starting development server with run-dev.sh..."
./run-dev.sh
