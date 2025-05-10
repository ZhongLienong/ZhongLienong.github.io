/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    domains: ['beeneverywhere.net'],
    unoptimized: true, // Required for static export
  }
}

// Only add basePath and assetPrefix in production (GitHub Pages deployment)
if (process.env.NODE_ENV === 'production') {
  nextConfig.basePath = '/ZhongLienong.github.io'
  nextConfig.assetPrefix = '/ZhongLienong.github.io/'
}

module.exports = nextConfig