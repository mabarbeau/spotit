<template>
  <div id="google-login-button" />
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
