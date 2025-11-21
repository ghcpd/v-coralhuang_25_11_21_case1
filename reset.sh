#!/bin/bash

# Reset script for To-Do List project
echo "🔄 Resetting To-Do List project..."

# Remove node_modules
if [ -d "node_modules" ]; then
    echo "🗑️  Removing node_modules..."
    rm -rf node_modules
    echo "✅ node_modules removed"
fi

# Remove .next build directory
if [ -d ".next" ]; then
    echo "🗑️  Removing .next build directory..."
    rm -rf .next
    echo "✅ .next removed"
fi

# Remove package-lock.json
if [ -f "package-lock.json" ]; then
    echo "🗑️  Removing package-lock.json..."
    rm package-lock.json
    echo "✅ package-lock.json removed"
fi

# Remove yarn.lock if exists
if [ -f "yarn.lock" ]; then
    echo "🗑️  Removing yarn.lock..."
    rm yarn.lock
    echo "✅ yarn.lock removed"
fi

echo ""
echo "🎉 Reset complete!"
echo ""
echo "To set up the project again, run:"
echo "  ./setup.sh (Unix/Mac)"
echo "  setup.bat (Windows)"
