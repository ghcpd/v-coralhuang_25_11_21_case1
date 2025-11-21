#!/usr/bin/env bash
set -euo pipefail

# Setup script for the Next.js + Tailwind To-Do app

# Detect package manager
if command -v yarn >/dev/null 2>&1; then
  PM=yarn
else
  PM=npm
fi

echo "Using package manager: $PM"

# Install dependencies
$PM install

cat <<'EOF'

Setup complete.
- Run dev server: $PM run dev
- Run tests: $PM test
- Verify: $PM run verify
EOF
