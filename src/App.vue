<template>
  <div id="app" class="min-h-screen flex flex-col">
    <app-header />
    <main class="flex-1 relative">
      <app-confirm v-if="confirm" />
      <router-view v-if="!error" />
      <app-error v-else />
      <app-notification v-if="notification" />
    </main>
    <app-footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import AppConfirm from '@/layout/Confirm.vue'
import AppError from '@/views/errors/Index.vue'
import AppFooter from '@/layout/Footer.vue'
import AppHeader from '@/layout/Header.vue'
import AppNotification from '@/layout/Notification.vue'

export default Vue.extend({
  name: 'App',
  components: {
    AppConfirm,
    AppError,
    AppFooter,
    AppHeader,
    AppNotification,
  },
  computed: {
    ...mapState('errors', ['error']),
    ...mapState('confirm', { confirm: 'message' }),
    ...mapState('notification', { notification: 'message' }),
  },
  watch: {
    $route() {
      this.$store.dispatch('errors/clear')
    },
  },
})
</script>
