/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['beeneverywhere.net'],
  },
  basePath: '',
  assetPrefix: '',
  output: 'export',
  distDir: 'out',
}

module.exports = nextConfig
