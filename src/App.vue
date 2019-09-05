<template>
  <div
    id="app"
    class="min-h-screen flex flex-col"
  >
    <app-header />
    <main class="flex-1 relative">
      <router-view />
    </main>
    <app-footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AppHeader from '@/layout/Header.vue';
import AppFooter from '@/layout/Footer.vue';

export default Vue.extend({
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },
});
</script>
