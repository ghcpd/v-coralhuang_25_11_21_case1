#!/usr/bin/env bash
set -euo pipefail

echo "Cleaning node_modules and build artifacts..."
rm -rf node_modules .next yarn.lock package-lock.json
echo "Reset complete. Run ./setup.sh to re-install deps."
