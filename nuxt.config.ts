export default defineNuxtConfig({
  modules: ["@kevinmarrec/nuxt-pwa"],
  pwa: {
    workbox: {
      enabled: true,
    },
  },
});
