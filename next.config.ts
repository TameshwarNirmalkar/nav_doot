import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  skipMiddlewareUrlNormalize: true,
  skipTrailingSlashRedirect: true,
  turbopack: {
    root: path.join(__dirname, "."),
  },
  experimental: {
    useCache: true,
  },
  generateEtags: true,
  compress: true,
  cleanDistDir: true,
  reactStrictMode: false,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    /** Only run ESLint on these directories with `next lint` and `next build`. */
    dirs: ["src"],
    /** Do not run ESLint during production builds (`next build`). */
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ["image/webp"],
    localPatterns: [
      {
        pathname: "/assets/images/**",
        search: "",
      },
    ],
    // domains: ["placehold.co", "pexels.com", "images.pexels.com", "i.ibb.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://127.0.0.1:5000/",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "pexels.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
    ],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // 1. Find the default rule that handles all image/asset files.
    // This rule is responsible for handling png, jpg, gif, and the default svg handling.
    const fileLoaderRule = config.module.rules.find((rule: RuleSetRule) => rule.test instanceof RegExp && rule.test.test(".svg"));

    // 2. Exclude SVGs from Next.js"s default asset handling rule.
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/;
    }

    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|svg|ttf|woff|woff2)$/,
      issuer: { and: [/\.(js|ts|md)x?$/] },
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            // Optional: Configure svgo options here if needed
            // svgo: false,
          },
        },
      ],
    });

    // 4. (Optional) If you were trying to handle fonts separately, you could add a specific rule for them.
    // For most fonts (ttf, woff, woff2), the default Next.js Asset Modules is sufficient.

    return config;
  },
  devIndicators: {
    position: "bottom-right",
  },
};

export default nextConfig;
