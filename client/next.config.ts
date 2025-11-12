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
      // Production Strapi API - Environment variable'dan gelecek
      ...(process.env.NEXT_PUBLIC_API_BASE_URL && process.env.NEXT_PUBLIC_API_BASE_URL.startsWith('https')
        ? (() => {
            try {
              const url = new URL(process.env.NEXT_PUBLIC_API_BASE_URL);
              return [{
                protocol: 'https' as const,
                hostname: url.hostname,
              }];
            } catch {
              return [];
            }
          })()
        : []),
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    // Allow localhost images for development
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
