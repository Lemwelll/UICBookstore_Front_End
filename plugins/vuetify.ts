import { createVuetify } from "vuetify";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: "light",
      themes: {
        light: {
          dark: false,
          colors: {
            primary: "#F37F9E",
            secondary: "#59C7EA",
          },
        },
      },
    },
    defaults: {
      font: { family: "Google Sans Display,Arial,Helvetica,sans-serif" },
      VTextField: {
        variant: "outlined",
        density: "compact",
        persistentHint: true,
        hint: "Required",
      },
      VBtn: {
        class: "text-capitalize",
      },
      VSelect: {
        density: "compact",
        variant: "outlined",
        hint: "Required",
        persistentHint: true,
      },
      VTextarea: {
        variant: "outlined",
        persistentHint: true,
        hint: "Required",
      },
    },
  });
  nuxtApp.vueApp.use(vuetify);
});
