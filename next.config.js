/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  swcMinify: true, 
  images: {
    domains: ['beeneverywhere.net'],
    unoptimized: true,
  },
}

module.exports = nextConfig
