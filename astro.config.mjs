// astro.config.mjs
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  site: "https://408a2c22.babycakes.pages.dev",
  output: "static",
  integrations: [
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        if (item.url.includes("/weekly-updates/")) {
          return { ...item, priority: 0.9, changefreq: "weekly" };
        }
        if (item.url === "https://408a2c22.babycakes.pages.dev/"\) {
          return { ...item, priority: 1.0, changefreq: "weekly" };
        }
        return item;
      },
    }),
  ],
  build: { assets: "_assets" },
  image: {
    domains: ["res.cloudinary.com"],
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
  vite: {
    plugins: [tailwindcss()],
    build: { cssCodeSplit: true },
  },
});
