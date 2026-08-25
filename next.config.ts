import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repositoryName =
  process.env.GITHUB_REPOSITORY?.split("/").at(-1) ?? "yongho-ko-profile";
const basePath = isGitHubPages ? `/${repositoryName}` : "";

const nextConfig: NextConfig = isGitHubPages
  ? {
      output: "export",
      basePath,
      assetPrefix: basePath,
      trailingSlash: true,
    }
  : {};

export default nextConfig;
