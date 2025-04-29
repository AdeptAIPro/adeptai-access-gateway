
#!/bin/bash

echo "🚀 Ensuring Vite is installed and accessible..."

# Make this script executable
chmod +x ensure-vite.sh

# Ensure npm is available
if ! command -v npm &> /dev/null; then
  echo "❌ npm is not installed. Please install Node.js and npm first."
  exit 1
fi

# Install vite locally if not already installed
if ! npm list vite --depth=0 &> /dev/null; then
  echo "📦 Installing Vite locally..."
  npm install --save-dev vite@latest @types/node
fi

# Install other critical dependencies if missing
for pkg in react-router-dom sonner react-hook-form @hookform/resolvers zod date-fns @types/node
do
  if ! npm list $pkg --depth=0 &> /dev/null; then
    echo "📦 Installing $pkg..."
    npm install $pkg
  fi
done

# Fix PATH to include node_modules/.bin
export PATH="$PATH:$(npm bin)"
export PATH="$PATH:$(npm config get prefix)/bin"
export PATH="$PATH:./node_modules/.bin"

# Create a helper script to run vite with correct PATH
cat > run-vite.sh << 'EOL'
#!/bin/bash
export PATH="$PATH:$(npm bin)"
export PATH="$PATH:$(npm config get prefix)/bin"
export PATH="$PATH:./node_modules/.bin"

if [ -f "./node_modules/.bin/vite" ]; then
  echo "Running local Vite from ./node_modules/.bin/vite"
  ./node_modules/.bin/vite "$@"
elif command -v npx &> /dev/null; then
  echo "Running Vite with npx"
  npx vite "$@"
else
  echo "❌ Vite not found! Please run ./ensure-vite.sh first."
  exit 1
fi
EOL

chmod +x run-vite.sh

echo "✅ Setup complete!"
echo "Now run: ./run-vite.sh to start the development server."
