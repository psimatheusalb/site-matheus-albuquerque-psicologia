/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coreva-normal.trae.ai"
      }
    ]
  }
};

module.exports = nextConfig;
