@echo off
echo 🚀 Preparing project for Vercel deployment...

REM Clean previous builds
echo 🧹 Cleaning previous builds...
if exist .next rmdir /s /q .next
if exist out rmdir /s /q out
if exist dist rmdir /s /q dist

REM Install dependencies
echo 📦 Installing dependencies...
pnpm install

REM Type check
echo 🔍 Running type check...
pnpm run type-check

REM Build the project
echo 🏗️ Building the project...
pnpm run build

echo ✅ Project is ready for deployment!
echo 📄 Files to commit:
echo   - vercel.json
echo   - .env.production  
echo   - Updated next.config.ts
echo   - Updated package.json

pause
