#!/usr/bin/env bash
set -euo pipefail

# Reset script: cleans install artifacts and reinstalls dependencies

rm -rf node_modules .next out coverage
rm -f package-lock.json yarn.lock pnpm-lock.yaml

./setup.sh
