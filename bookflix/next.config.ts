import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "covers.openlibrary.org", pathname: "/b/**" },
      { protocol: "https", hostname: "www.gutenberg.org" },
      { protocol: "https", hostname: "gutenberg.org" },
      { protocol: "https", hostname: "archive.org" },
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "192.168.1.8:3000"]
    }
  }
};

export default nextConfig;
