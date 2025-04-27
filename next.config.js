/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['beeneverywhere.net'],
  },
}

module.exports = nextConfig
