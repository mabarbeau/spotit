<template>
  <div class="absolute h-full w-full flex justify-center">
    <div class=" w-full max-w-xs self-center pb-10">
      <app-login-google />
    </div>
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
