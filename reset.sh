#!/usr/bin/env bash
echo "Resetting project: Cleaning node_modules and reinstalling dependencies..."
rm -rf node_modules package-lock.json .next
npm install
echo "Reset and install complete."
