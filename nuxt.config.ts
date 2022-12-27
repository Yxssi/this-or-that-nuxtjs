export default {
  nitro: {
    preset: "vercel-edge",
  },
  buildModules: ["@nuxtjs/pwa"],
  pwa: {
    icon: false,
    meta: {
      name: "This or That",
      theme_color: "#000000",
      lang: "en",
      mobileApp: true,
      mobileAppIOS: true,
      nativeUI: true,
      author: "A. Labille & Y. Munguengui",
    },
    manifest: {
      name: "This or That",
      lang: "en",
      useWebmanifestExtension: false,
    },
  },
};
