import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Unsplash
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },

      // Local Strapi (geliştirme için)
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
      },

      // --- PRODUCTION STRAPI ---
      {
        protocol: "https",
        hostname: "astridmoonadminpanel.store",
      },

      // Eğer Strapi medya dosyalarını alt domain'den veriyorsa
      {
        protocol: "https",
        hostname: "media.astridmoonadminpanel.store",
      },
    ],

    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
