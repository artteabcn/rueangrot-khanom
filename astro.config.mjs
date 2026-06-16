import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "server",
  adapter: cloudflare({ platformProxy: { enabled: true } }),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias:
        process.env.NODE_ENV === "production"
          ? { "react-dom/server": "react-dom/server.edge" }
          : undefined,
    },
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr", "th"],
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: true },
  },
  site: "https://restaurant-slug.pages.dev",
});
