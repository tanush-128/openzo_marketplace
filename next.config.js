/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");
import withPWAInit from "next-pwa";
import { env } from "process";

const withPWA = withPWAInit({
  dest: "public",
  disable: env.NODE_ENV === "development",
});

// /** @type {import("next").NextConfig} */
// const config = ;



export default withPWA({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,

  },

  
});
