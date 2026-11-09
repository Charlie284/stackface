import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "static-route-aliases",
      closeBundle() {
        const output = resolve("dist");
        const html = readFileSync(resolve(output, "index.html"), "utf8");
        for (const route of ["404.html"]) {
          const file = resolve(output, route);
          mkdirSync(dirname(file), { recursive: true });
          writeFileSync(file, html);
        }
      },
    },
  ],
  base: process.env.VITE_BASE_PATH || "/",
  server: { host: "127.0.0.1" },
});
