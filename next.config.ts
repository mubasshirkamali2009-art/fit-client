import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.example.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Add your real image host(s) here once you switch off placeholder URLs, e.g.:
      // { protocol: "https", hostname: "res.cloudinary.com" },
      // { protocol: "https", hostname: "your-bucket.s3.amazonaws.com" },
    ],
  },
};

export default nextConfig;