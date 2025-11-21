#!/bin/bash

# Complete verification script
echo "🔍 Running complete project verification..."
echo ""

# Check Node.js
echo "1️⃣ Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "   ❌ Node.js not found"
    exit 1
fi
echo "   ✅ Node.js: $(node --version)"

# Check npm
echo "2️⃣ Checking npm installation..."
if ! command -v npm &> /dev/null; then
    echo "   ❌ npm not found"
    exit 1
fi
echo "   ✅ npm: $(npm --version)"

# Check dependencies
echo "3️⃣ Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo "   ⚠️  node_modules not found, installing..."
    npm install
fi
echo "   ✅ Dependencies installed"

# Run tests
echo "4️⃣ Running automated tests..."
npm run verify
if [ $? -eq 0 ]; then
    echo "   ✅ All tests passed"
else
    echo "   ❌ Tests failed"
    exit 1
fi

# Check build
echo "5️⃣ Checking if build succeeds..."
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "   ✅ Build successful"
else
    echo "   ❌ Build failed"
    exit 1
fi

echo ""
echo "🎉 All verifications passed!"
echo ""
echo "To start the development server:"
echo "  npm run dev"
