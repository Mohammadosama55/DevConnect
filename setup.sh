#!/bin/bash
# DevConnect Setup & Installation Script

echo "🚀 DevConnect Setup Script"
echo "========================="

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"

# Install server dependencies
echo ""
echo "📦 Installing server dependencies..."
cd server
npm install
if [ $? -eq 0 ]; then
    echo "✅ Server dependencies installed"
else
    echo "❌ Failed to install server dependencies"
    exit 1
fi

# Install client dependencies
echo ""
echo "📦 Installing client dependencies..."
cd ../client
npm install
if [ $? -eq 0 ]; then
    echo "✅ Client dependencies installed"
else
    echo "❌ Failed to install client dependencies"
    exit 1
fi

echo ""
echo "✅ Installation complete!"
echo ""
echo "📝 Next steps:"
echo "1. Configure environment variables:"
echo "   - Copy server/.env.example to server/.env"
echo "   - Copy client/.env.example to client/.env"
echo "   - Edit .env files with your values"
echo ""
echo "2. Start development servers:"
echo "   Terminal 1: cd server && npm run dev"
echo "   Terminal 2: cd client && npm run dev"
echo ""
echo "3. Access the application:"
echo "   - Frontend: http://localhost:5174"
echo "   - Backend API: http://localhost:5000"
echo "   - API Docs: http://localhost:5000"
echo ""
echo "🎉 Happy coding!"
