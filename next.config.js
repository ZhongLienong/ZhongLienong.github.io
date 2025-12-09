/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    domains: ['beeneverywhere.net'],
    unoptimized: true, // Required for static export
  },
  webpack: (config, { isServer }) => {
    // Add WASM support
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };

    // Add rule for .wasm files
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'webassembly/async',
    });

    return config;
  },
}

// Note: basePath and assetPrefix are NOT needed when using a custom domain
// Custom domain (www.zhuhanwen.com) serves from root, not a subdirectory

module.exports = nextConfig