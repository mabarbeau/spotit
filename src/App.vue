<template>
  <div id="app">
    <div class="min-h-screen flex flex-col" :class="{ filtered: isFiltered }">
      <app-header />
      <main class="flex-1 relative">
        <router-view v-if="!error" />
        <app-error v-else />
        <app-notification v-if="notification" />
      </main>
      <app-footer />
    </div>
    <app-confirm v-if="confirm" />
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
    isFiltered() {
      return this.confirm ? true : false
    },
  },
  watch: {
    $route() {
      this.$store.dispatch('errors/clear')
    },
  },
})
</script>
<style>
.filtered {
  filter: blur(3px) grayscale(100%);
}
</style>
