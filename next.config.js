/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/ZhongLienong.github.io',
  assetPrefix: '/ZhongLienong.github.io/',
  images: {
    domains: ['beeneverywhere.net'],
    unoptimized: true, // Required for static export
  },
}

module.exports = nextConfig
