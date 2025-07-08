#!/bin/bash
# Deployment preparation script

echo "🚀 Preparing project for Vercel deployment..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf out
rm -rf dist

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Type check
echo "🔍 Running type check..."
pnpm run type-check

# Build the project
echo "🏗️ Building the project..."
pnpm run build

echo "✅ Project is ready for deployment!"
echo "📄 Files to commit:"
echo "  - vercel.json"
echo "  - .env.production"
echo "  - Updated next.config.ts"
echo "  - Updated package.json"
