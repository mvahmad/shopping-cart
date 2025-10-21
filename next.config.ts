import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env:{
    GITHUB_ID:process.env.AUTH_GITHUB_ID,
    GITHUB_SECRET:process.env.AUTH_GITHUB_SECRET
  },

  // 
};

export default nextConfig;
