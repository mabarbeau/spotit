<template>
  <div id="app" class="min-h-screen flex flex-col">
    <app-header />
    <main class="flex-1 relative">
      <router-view v-if="!error" />
      <app-error v-else />
    </main>
    <app-footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import AppHeader from '@/layout/Header.vue'
import AppFooter from '@/layout/Footer.vue'
import AppError from '@/views/errors/Index.vue'

export default Vue.extend({
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    AppError,
  },
  computed: {
    ...mapState('errors', ['error']),
  },
  watch: {
    $route() {
      this.$store.dispatch('errors/clear')
    },
  },
})
</script>
