/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: "loose",
    serverComponentsExternalPackages: ["mongoose"],
    appDir: true,
  },

  webpack: (config) => {
    config.experiments = {
      layers: true,

      topLevelAwait: true,
    };
    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.dummyjson.com",
      },
    ],
  },
};

module.exports = nextConfig;
