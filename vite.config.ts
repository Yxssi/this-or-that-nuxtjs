import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "This or That",
        lang: "en",
        description: "This or That Game",
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
