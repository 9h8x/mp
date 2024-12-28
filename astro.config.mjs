// @ts-check
import { defineConfig } from "astro/config";

import node from "@astrojs/node";
import react from "@astrojs/react";
import clerk from '@clerk/astro'
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  adapter: node({
    mode: "standalone",
  }),
  integrations: [
    clerk(),
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  output: "server", // Change output mode to server
});
