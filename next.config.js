/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    domains: ['beeneverywhere.net'],
    unoptimized: true, // Required for static export
  }
}

// Note: basePath and assetPrefix are NOT needed when using a custom domain
// Custom domain (www.zhuhanwen.com) serves from root, not a subdirectory

module.exports = nextConfig