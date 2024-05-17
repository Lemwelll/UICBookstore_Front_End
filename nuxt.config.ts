import vuetify from "vite-plugin-vuetify";
// https://v3.nuxtjs.org/api/configuration/nuxt.config
// @ts-ignore
export default defineNuxtConfig({
  devServer: {
    port: 5151
  },
  devtools: { enabled: true },
  css: ["vuetify/styles", "@/assets/css/main.css"], // vuetify ships precompiled css, no need to import sass
  app: {
    head: {
      link: [],
    },
  },
  vite: {
    // @ts-ignore
    ssr: {
      noExternal: ["vuetify"], // add the vuetify vite plugin
    },
  },
  modules: [
    (_, nuxt) => {
      // @ts-ignore
      // this adds the vuetify vite plugin
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        config.plugins?.push(vuetify());
      });
    },
    "@nuxtjs/eslint-module",
  ],

  imports: {
    dirs: ["stores"],
  },

  runtimeConfig: {
    public: {
      AUTHENTICATION_API: process.env.AUTHENTICATION_API as string,
      DOMAIN: (process.env.DOMAIN || "localhost") as string,
      BASE_URL: process.env.BASE_URL as string,
      SERVICE_ACCOUNT: process.env.SERVICE_ACCOUNT as string,
      SERVICE_FINANCE: process.env.SERVICE_FINANCE as string,
      SERVICE_INVENTORY: process.env.SERVICE_INVENTORY as string,
      SERVICE_SALES: process.env.SERVICE_SALES as string,
      SERVICE_HUMAN_RESOURCES: process.env.SERVICE_HUMAN_RESOURCES as string,
    },
  },
});
