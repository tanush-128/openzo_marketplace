/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
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
