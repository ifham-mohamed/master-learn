import type { NextConfig } from "next";
const pages = process.env.NEXT_PUBLIC_GITHUB_PAGES === "true";
const config: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  ...(pages
    ? {
        output: "export",
        trailingSlash: true,
        basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
        images: { unoptimized: true },
      }
    : {}),
};
export default config;
