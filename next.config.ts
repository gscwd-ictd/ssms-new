import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
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
