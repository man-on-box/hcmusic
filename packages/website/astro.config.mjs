// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sanity from "@sanity/astro";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";

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
    optimizeDeps: {
      include: [
        "react/compiler-runtime",
        "lodash/isObject.js",
        "lodash/groupBy.js",
        "lodash/keyBy.js",
        "lodash/partition.js",
        "lodash/sortedIndex.js",
      ],
    },
  },
  image: {
    domains: ["cdn.sanity.io"],
  },
  integrations: [
    sanity({
      projectId: "x6ftvyem",
      dataset: "production",
      useCdn: false,
      stega: {
        studioUrl: "http://localhost:3333",
      },
    }),
    react(),
  ],
  adapter: isWorkerPreview ? cloudflare() : undefined,
});
