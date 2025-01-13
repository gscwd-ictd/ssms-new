import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "avatars.gscwd.app",
        protocol: "https",
        // port: "",
        // pathname: "/**",
        // search: "",
      },
    ],
  },
};

export default nextConfig;
