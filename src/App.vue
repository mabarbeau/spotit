<template>
  <div id="app">
    <div class="min-h-screen flex flex-col" :class="{ filtered: isFiltered }">
      <app-header />
      <main class="flex-1 relative">
        <transition name="fade" mode="out-in">
          <router-view v-if="!error" />
          <app-error v-else />
        </transition>
        <transition name="slide-fade">
          <app-alert v-show="alert.length" />
        </transition>
      </main>
      <app-footer />
    </div>

    <app-confirm v-show="confirm" />
  </div>
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
    ...mapState('errors', ['error']),
    ...mapState('confirm', { confirm: 'message' }),
    ...mapState('alert', { alert: 'messages' }),
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
