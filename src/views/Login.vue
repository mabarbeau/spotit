<template>
  <div class="bg-gray-200 absolute h-full w-full flex justify-center">
    <div class=" w-full max-w-xs self-center pb-10">
      <div id="google-login-button" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import render from '@/utils/gapis'

export default Vue.extend({
  name: 'Login',
  mounted() {
    render('google-login-button')
  },
})
</script>
