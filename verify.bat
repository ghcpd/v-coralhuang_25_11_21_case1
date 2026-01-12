@echo off
REM Complete verification script (Windows)
echo Running complete project verification...
echo.

REM Check Node.js
echo 1. Checking Node.js installation...
node --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo    Node.js not found
    exit /b 1
)
node --version
echo    Node.js found

REM Check npm
echo 2. Checking npm installation...
npm --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo    npm not found
    exit /b 1
)
npm --version
echo    npm found

REM Check dependencies
echo 3. Checking dependencies...
if not exist "node_modules" (
    echo    node_modules not found, installing...
    npm install
)
echo    Dependencies installed

REM Run tests
echo 4. Running automated tests...
npm run verify
if %ERRORLEVEL% EQU 0 (
    echo    All tests passed
) else (
    echo    Tests failed
    exit /b 1
)

REM Check build
echo 5. Checking if build succeeds...
npm run build >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo    Build successful
) else (
    echo    Build failed
    exit /b 1
)

echo.
echo All verifications passed!
echo.
echo To start the development server:
echo   npm run dev
