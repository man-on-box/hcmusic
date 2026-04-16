// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sanity from "@sanity/astro";
import cloudflare from "@astrojs/cloudflare";

const isWorkerPreview = process.env.DEPLOY_TARGET === "workers-preview";

// https://astro.build/config
export default defineConfig({
  output: isWorkerPreview ? "server" : "static",
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
  adapter: isWorkerPreview ? cloudflare() : undefined,
});
