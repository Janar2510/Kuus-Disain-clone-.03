import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Assets are already sized for the layout and a hosted Worker has no image
  // optimizer, so serve the source files directly.
  images: { unoptimized: true },
  // The cloud preview panel serves this app through its own hostname. Next 16
  // blocks cross-origin dev resources (chunks + HMR) by default, which leaves
  // the page unhydrated behind a blank screen unless the exact host is allowed.
  allowedDevOrigins: [
    "pv-15be51091dc0-c6f95cc1-18a9-4d90-9c7a-e38e6d85c449.style.dev",
  ],
};

export default nextConfig;
