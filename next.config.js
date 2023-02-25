const url = new URL(process.env.ASSET_URL);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: url.host,
        port: url.port,
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
