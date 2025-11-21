#!/usr/bin/env bash
set -euo pipefail

echo "Installing dependencies..."
if [ -f yarn.lock ]; then
  yarn install
else
  npm install
fi

echo "Setup complete. To start dev server: yarn dev"
