import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

const mq = window.matchMedia('(prefers-color-scheme: dark)')

const vuetify = new Vuetify({
  theme: {
    dark: mq.matches,
    themes: {
      light: {
        // background: colors.grey.lighten2,
        // primary: colors.blue.darken4,
        // secondary: colors.red.lighten4,
        // accent: colors.indigo.base,
      },
      dark: {
        // background: colors.grey.darken4,
        // primary: colors.blue.darken4,
        // secondary: colors.red.lighten4,
        // accent: colors.indigo.base,
      },
    },
  },
})

mq.addEventListener('change', (e) => {
  vuetify.framework.theme.dark = e.matches
})

export default vuetify
