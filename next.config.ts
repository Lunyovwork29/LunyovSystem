import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * /favicon.ico запрашивается до разбора <head>. Отдаём лёгкий PNG из public/.
   */
  async rewrites() {
    return [{ source: "/favicon.ico", destination: "/favicon.png" }];
  },
};

export default nextConfig;
