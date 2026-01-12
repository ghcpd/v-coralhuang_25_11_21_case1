@echo off
REM Setup script for To-Do List project (Windows)
echo Setting up To-Do List project...

REM Check if Node.js is installed
node --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed. Please install Node.js first.
    exit /b 1
)

echo Node.js version:
node --version

REM Check if npm is installed
npm --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo npm is not installed. Please install npm first.
    exit /b 1
)

echo npm version:
npm --version

REM Install dependencies
echo Installing dependencies...
npm install

if %ERRORLEVEL% EQU 0 (
    echo Dependencies installed successfully
) else (
    echo Failed to install dependencies
    exit /b 1
)

REM Verify setup
echo.
echo Setup complete!
echo.
echo Available commands:
echo   npm run dev       - Start development server on port 3000
echo   npm run build     - Build for production
echo   npm run start     - Start production server
echo   npm test          - Run tests
echo   npm run verify    - Run all tests with verbose output
echo.
echo To get started:
echo   npm run dev
