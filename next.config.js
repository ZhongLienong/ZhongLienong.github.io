/** @type {import('next').NextConfig} */
const repoName = 'ZhongLienong.github.io';

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['beeneverywhere.net'],
    unoptimized: true,
  },
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
  output: 'export',
};

module.exports = nextConfig;
