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
      ...(() => {
        const patterns: { protocol: 'http' | 'https'; hostname: string }[] = [];
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

        if (!baseUrl) {
          return patterns;
        }

        try {
          const apiUrl = new URL(baseUrl);
          const protocol = apiUrl.protocol.replace(':', '') as 'http' | 'https';

          patterns.push({
            protocol,
            hostname: apiUrl.hostname,
          });

          // Strapi Cloud medya dosyaları ayrı bir subdomain üzerinden servis edilir (.media.strapiapp.com)
          if (apiUrl.hostname.endsWith('.strapiapp.com')) {
            const mediaHostname = apiUrl.hostname.replace(
              '.strapiapp.com',
              '.media.strapiapp.com',
            );

            patterns.push({
              protocol: 'https',
              hostname: mediaHostname,
            });
          }
        } catch {
          // ignore invalid URL
        }

        return patterns;
      })(),
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    // Allow localhost images for development
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
