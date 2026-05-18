import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig({
  tanstackStart: {
    server: { entry: "./src/server" },
  },
  vite: {
    server: {
      host: "0.0.0.0",
      allowedHosts: ["truston1.onrender.com"],
    },
    preview: {
      host: "0.0.0.0",
      allowedHosts: ["truston1.onrender.com"],
    },
  },
});
