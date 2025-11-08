import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    // Allow localhost images for development
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
