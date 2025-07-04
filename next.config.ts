import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "t.me",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "photos.zillowstatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ayatrealestate.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
