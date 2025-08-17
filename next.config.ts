import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env:{
    GITHUB_ID:"Ov23li7UVhecWhnJ9lQW",
    GITHUB_SECRET:"0998c21273d63d0c492fa9db0a3d06aab0a9d9a4"
  },

  images:{
    domains: ["avatars.githubusercontent.com"]
  }
};

export default nextConfig;
