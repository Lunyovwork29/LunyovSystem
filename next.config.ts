import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Браузеры часто дергают /favicon.ico до разбора <head>.
   * Если файла нет — виден «чужой» дефолт. Отдаём тот же PNG, что и /icon.png.
   */
  async rewrites() {
    return [{ source: "/favicon.ico", destination: "/icon.png" }];
  },
};

export default nextConfig;
