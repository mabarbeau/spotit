<template>
  <v-app
    id="app"
    :style="{ background: $vuetify.theme.themes[theme].background }"
  >
    <div class="min-h-screen flex flex-col">
      <app-header />
      <v-content>
        <transition name="fade" mode="out-in">
          <router-view v-if="!error" />
          <app-error v-else />
        </transition>
        <app-alert v-if="alert.length" />
      </v-content>
      <app-footer />
    </div>
    <app-confirm />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import AppConfirm from '@/views/layout/Confirm.vue'
import AppError from '@/views/errors/500.vue'
import AppFooter from '@/views/layout/Footer.vue'
import AppHeader from '@/views/layout/Header.vue'
import AppAlert from '@/views/layout/Alert.vue'

export default Vue.extend({
  name: 'App',
  components: {
    AppConfirm,
    AppError,
    AppFooter,
    AppHeader,
    AppAlert,
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? 'dark' : 'light'
    },
    ...mapState('auth', ['me']),
    ...mapState('errors', ['error']),
    ...mapState('alert', { alert: 'messages' }),
  },
  watch: {
    $route() {
      this.$store.dispatch('errors/clear')
    },
  },
})
</script>
