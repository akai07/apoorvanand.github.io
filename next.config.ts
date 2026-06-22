import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  assetPrefix: "/apoorvanand.github.io",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
