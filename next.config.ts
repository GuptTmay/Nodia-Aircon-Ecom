import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // experimental: {
  //   serverSourceMaps: false,
  //   preloadEntriesOnStart: false,
  // },
  // typescript: {
  //   // !! WARN !!
  //   // Dangerously allow production builds to successfully complete even if
  //   // your project has type errors.
  //   // !! WARN !!
  //   ignoreBuildErrors: false,
  // },
  // productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [new URL('https://picsum.photos/**')],
  },
};

export default nextConfig;
