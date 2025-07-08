import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove standalone output for Windows compatibility
  // output: 'standalone',

  // Optimize images for Vercel
  images: {
    unoptimized: false,
  },

  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // Ensure proper TypeScript handling
  typescript: {
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
