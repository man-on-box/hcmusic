// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sanity from "@sanity/astro";
import cloudflare from "@astrojs/cloudflare";

// We set this env var at BUILD TIME
const isWorkerPreview = process.env.DEPLOY_TARGET === "workers-preview";

// https://astro.build/config
export default defineConfig({
  output: "server",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    domains: ["cdn.sanity.io"],
  },
  integrations: [
    sanity({
      projectId: "x6ftvyem",
      dataset: "production",
      useCdn: false,
    }),
  ],
  adapter: cloudflare(),
});
