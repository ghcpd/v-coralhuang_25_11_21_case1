@echo off
REM Reset script for To-Do List project (Windows)
echo Resetting To-Do List project...

REM Remove node_modules
if exist "node_modules" (
    echo Removing node_modules...
    rmdir /s /q node_modules
    echo node_modules removed
)

REM Remove .next build directory
if exist ".next" (
    echo Removing .next build directory...
    rmdir /s /q .next
    echo .next removed
)

REM Remove package-lock.json
if exist "package-lock.json" (
    echo Removing package-lock.json...
    del package-lock.json
    echo package-lock.json removed
)

REM Remove yarn.lock if exists
if exist "yarn.lock" (
    echo Removing yarn.lock...
    del yarn.lock
    echo yarn.lock removed
)

echo.
echo Reset complete!
echo.
echo To set up the project again, run:
echo   setup.bat
