<template>
  <div id="app" class="min-h-screen flex flex-col">
    <app-header />
    <main class="flex-1 relative">
      <app-notification v-if="message" />
      <router-view v-if="!error" />
      <app-error v-else />
    </main>
    <app-footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import AppError from '@/views/errors/Index.vue'
import AppFooter from '@/layout/Footer.vue'
import AppHeader from '@/layout/Header.vue'
import AppNotification from '@/layout/Notification.vue'

export default Vue.extend({
  name: 'App',
  components: {
    AppError,
    AppFooter,
    AppHeader,
    AppNotification,
  },
  computed: {
    ...mapState('errors', ['error']),
    ...mapState('notification', ['message']),
  },
  watch: {
    $route() {
      this.$store.dispatch('errors/clear')
    },
  },
})
</script>
