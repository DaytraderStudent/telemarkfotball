import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "telemarkfotball.wordpress.com",
      },
      {
        protocol: "https",
        hostname: "images.fotball.no",
      },
    ],
  },
};

export default nextConfig;
