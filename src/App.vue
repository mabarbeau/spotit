<template>
  <div
    id="app"
    class="min-h-screen flex flex-col"
  >
    <app-header />
    <main class="flex-1 relative">
    <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AppHeader from '@/layout/Header.vue';

export default Vue.extend({
  name: 'App',
  components: {
    AppHeader,
  },
});
</script>
