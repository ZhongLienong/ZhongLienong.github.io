/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['beeneverywhere.net'],
  },
  basePath: '/ZhongLienong.github.io',
  assetPrefix: '/ZhongLienong.github.io',
  output: 'export',
  distDir: 'out',
}

module.exports = nextConfig
