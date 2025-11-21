#!/usr/bin/env bash
set -e
echo "Removing node_modules and lockfile..."
rm -rf node_modules package-lock.json
echo "Reset complete."
