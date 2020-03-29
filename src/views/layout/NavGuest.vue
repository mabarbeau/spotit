<template>
  <div>
    <app-login-google />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppLoginGoogle from '@/components/AppLoginGoogle.vue'

export default Vue.extend({
  components: {
    AppLoginGoogle,
  },
})
</script>
