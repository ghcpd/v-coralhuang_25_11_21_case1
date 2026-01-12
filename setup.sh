#!/bin/bash

# Setup script for To-Do List project
echo "🚀 Setting up To-Do List project..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm --version)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Verify setup
echo ""
echo "🎉 Setup complete!"
echo ""
echo "Available commands:"
echo "  npm run dev       - Start development server on port 3000"
echo "  npm run build     - Build for production"
echo "  npm run start     - Start production server"
echo "  npm test          - Run tests"
echo "  npm run verify    - Run all tests with verbose output"
echo ""
echo "To get started:"
echo "  npm run dev"
