<template>
  <div class="absolute h-full w-full flex justify-center">
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
    render('google-login-button', {
      onsuccess: this.onSuccess,
      onfailure: this.onFailure,
    })
  },
  methods: {
    async onSuccess(user: any) {
      await this.$store.dispatch('auth/setCsrfCookie')
      await this.$store.dispatch('auth/login', {
        service: 'google',
        token: user.getAuthResponse().id_token,
      })
    },
    onFailure(error: any) {
      console.log(error)
    },
  },
})
</script>
